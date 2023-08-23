use crate::error_template::{AppError, ErrorTemplate};

#[cfg(feature = "ssr")]
use crate::structs::AggregatedUser;

use leptos::{ev::SubmitEvent, html::Input, *};

use bson::oid::ObjectId;
use leptos_meta::*;
use leptos_router::*;
use serde::*;

#[derive(Serialize, Deserialize, Debug, Clone)]
pub struct User {
    pub username: String,
    pub password: String,
    pub friends: Vec<ObjectId>,
}

#[derive(Serialize, Deserialize, Debug, Clone)]
pub struct AggregatedUser {
    pub username: String,
    pub password: String,
    pub friends: Vec<ObjectId>,
    pub friends_full: Vec<Box<User>>,
}
#[derive(Serialize, Deserialize, Debug, Clone)]
pub struct AuthPayload {
    username: String,
    password: String,
}

#[derive(Debug, Serialize, Deserialize)]
pub struct Claims {
    username: String,
    exp: usize,
}

#[server(SignIn, "/api")]
pub async fn sign_in(cx: Scope, payload: AuthPayload) -> Result<(), ServerFnError> {
    use crate::structs::{AggregatedUser, User};
    use axum::http::header::SET_COOKIE;
    use axum::http::HeaderValue;
    use bcrypt::verify;
    use futures::stream::StreamExt;
    use jsonwebtoken::{encode, EncodingKey, Header};
    use mongodb::{
        bson,
        bson::{doc, Document},
        Collection, Database,
    };
    use std::time::{SystemTime, UNIX_EPOCH};

    let pipeline = vec![
        doc! {
            "$match": {
               "username": &payload.username
            }
        },
        doc! {
            "$lookup": {
               "from": "users",
               "localField": "friends",
               "foreignField": "_id",
               "as": "friends_full",
            }
        },
    ];

    let user: AggregatedUser = bson::from_bson::<AggregatedUser>(bson::Bson::Document(
        use_context::<Database>(cx)
            .ok_or(ServerFnError::ServerError(
                "Could not connect to database".to_owned(),
            ))?
            .collection::<Collection<User>>("users")
            .aggregate(pipeline, None)
            .await?
            .next()
            .await
            .ok_or(ServerFnError::ServerError(
                "Invalid username or password".to_owned(),
            ))?
            .map_err(|_| ServerFnError::ServerError("Invalid username or password".to_owned()))?,
    ))
    .map_err(|_| ServerFnError::ServerError("Invalid username or password".to_owned()))?;

    log!("{:?}", user);

    verify(payload.password, &user.password)
        .map_err(|_| ServerFnError::Args("Invalid username or password".to_owned()))?;

    let claims = Claims {
        username: payload.username,
        // Mandatory expiry time as UTC timestamp
        exp: (SystemTime::now()
            .duration_since(UNIX_EPOCH)
            .map_err(|_| ServerFnError::ServerError("Error creating JWT".to_owned()))?
            .as_secs()
            + 60 * 60 * 24 * 30) as usize, // 30 days
    };
    // Create the authorization token
    let token = encode(
        &Header::default(),
        &claims,
        &EncodingKey::from_secret(
            std::env::var("JWT_SECRET")
                .expect("JWT_SECRET must be set")
                .as_bytes(),
        ),
    )
    .map_err(|_| ServerFnError::ServerError("Error creating JWT".to_owned()))?;

    use_context::<leptos_axum::ResponseOptions>(cx)
        .ok_or(ServerFnError::ServerError(
            "Could not access response header".to_owned(),
        ))?
        .append_header(
            SET_COOKIE,
            HeaderValue::from_str(&format!("jwt={}; Secure; HttpOnly; Path=/", token))
                .map_err(|_| ServerFnError::ServerError("Error sending JWT".to_owned()))?,
        );

    Ok(())
}

#[server(SignUp, "/api")]
pub async fn sign_up(cx: Scope, payload: AuthPayload) -> Result<(), ServerFnError> {
    use bcrypt::{hash, DEFAULT_COST};
    use http::header::CONTENT_TYPE;
    use http::HeaderValue;
    use mongodb::{bson::doc, Database};
    let db = use_context::<Database>(cx).unwrap();
    db.collection("users")
        .insert_one(
            doc! {"username": payload.username, "password": &hash(payload.password, DEFAULT_COST)?},
            None,
        )
        .await?;
    use_context::<leptos_axum::ResponseOptions>(cx)
        .ok_or(ServerFnError::ServerError(
            "Could not access response header".to_owned(),
        ))?
        .append_header(
            CONTENT_TYPE,
            HeaderValue::from_static("text/html; charset=utf-8"),
        );
    Ok(())
}

#[server(IsSignedIn, "/api")]
pub async fn is_signed_in(cx: Scope) -> Result<AggregatedUser, ServerFnError> {
    use crate::structs::{AggregatedUser, User};
    use futures::stream::StreamExt;
    use jsonwebtoken::{decode, Algorithm, DecodingKey, Validation};
    use leptos_axum::RequestParts;
    use mongodb::{
        bson,
        bson::{doc, Document},
        Collection, Database,
    };
    let decoded: Claims = decode(
        expect_context::<RequestParts>(cx)
            .headers
            .get("cookie")
            .ok_or(ServerFnError::MissingArg("Missing cookies".to_owned()))?
            .to_str()
            .map_err(|_| ServerFnError::Serialization("Header contains invalid chars".to_owned()))?
            .split("jwt=")
            .next()
            .ok_or(ServerFnError::ServerError(
                "Could not access request header".to_owned(),
            ))?
            .split(";")
            .next()
            .ok_or(ServerFnError::ServerError(
                "Could not access token".to_owned(),
            ))?,
        &DecodingKey::from_secret(
            std::env::var("JWT_SECRET")
                .expect("JWT_SECRET must be set")
                .as_bytes(),
        ),
        &Validation::new(Algorithm::HS256),
    )
    .map_err(|_| ServerFnError::ServerError("Error decoding JWT".to_owned()))?
    .claims;

    let pipeline = vec![
        doc! {
            "$match": {
               "username": &decoded.username
            }
        },
        doc! {
            "$lookup": {
               "from": "users",
               "localField": "friends",
               "foreignField": "_id",
               "as": "friends_full",
            }
        },
    ];

    let user: AggregatedUser = bson::from_bson::<AggregatedUser>(bson::Bson::Document(
        use_context::<Database>(cx)
            .ok_or(ServerFnError::ServerError(
                "Could not connect to database".to_owned(),
            ))?
            .collection::<Collection<User>>("users")
            .aggregate(pipeline, None)
            .await?
            .next()
            .await
            .ok_or(ServerFnError::ServerError(
                "Invalid username or password".to_owned(),
            ))?
            .map_err(|_| ServerFnError::ServerError("Invalid username or password".to_owned()))?,
    ))
    .map_err(|_| ServerFnError::ServerError("Invalid username or password".to_owned()))?;

    Ok(user)
}

#[component]
pub fn App(cx: Scope) -> impl IntoView {
    // Provides context that manages stylesheets, titles, meta tags, etc.
    provide_meta_context(cx);

    view! {
        cx,

        // injects a stylesheet into the document <head>
        // id=leptos means cargo-leptos will hot-reload this stylesheet
        <Stylesheet id="leptos" href="/pkg/start-axum.css"/>

        // sets the document title
        <Title text="Welcome to Leptos"/>

        // content for this welcome page
        <Router fallback=|cx| {
            let mut outside_errors = Errors::default();
            outside_errors.insert_with_default_key(AppError::NotFound);
            view! { cx,
                <ErrorTemplate outside_errors/>
            }
            .into_view(cx)
        }>
            <main>
                <Routes>
                    <Route path="/" view=|cx| view! {cx, <HomePage/>} />
                    <Route path="signin" view=|cx| view! {cx, <SignIn/>}/>
                    <Route path="signup" view=SignUp />
                </Routes>
            </main>
        </Router>
    }
}

/// Renders the home page of your application.
#[component]
fn SignIn(cx: Scope) -> impl IntoView {
    use serde_json;
    let (signed_in, set_signed_in) = create_signal(cx, false);

    let user_element: NodeRef<Input> = create_node_ref(cx);
    let pwd_element: NodeRef<Input> = create_node_ref(cx);

    view! { cx,
        {move || {
            if signed_in() {
                view! {cx, <div><Redirect path="/" /></div>}
            } else {
                view! {cx, <div></div>}
            }
        }}
        <h1>"Welcome to Leptos!"</h1>
        <form on:submit=move|e: SubmitEvent| {
            e.prevent_default();
            let data = format!(r#"
            {{
                "username": "{}",
                "password": "{}"
            }}"#,
            user_element().expect("<input> to exist").value(),
            pwd_element().expect("<input> to exist").value());

            let payload_json: AuthPayload = serde_json::from_str(&data).unwrap();

            log!("{:?}", payload_json);
            spawn_local(async move {
                if let Ok(_) = sign_in(cx, payload_json).await {
                    set_signed_in(true);
                }

            })

        }>
            <input node_ref=user_element />
            <input type="password" node_ref=pwd_element />
            <input type="submit" value="Sign In" />
        </form>
        <A href="/signup">"Sign Up"</A>
    }
}

#[component]
fn HomePage(cx: Scope) -> impl IntoView {
    let once = create_resource(
        cx,
        || (),
        move |_| async move { is_signed_in(cx).await.unwrap() },
    );

    view! { cx,
            <Suspense fallback=move || view! { cx, <p>"Loading..."</p> } >
            {move || {
                match once.read(cx) {
                    Some(true) => {
                        view! {cx, <div class="container">
                                    <div class="sidebar">
                                    </div>
                                    <div class="header"></div>
                                    <div class="content">
                                        <div class="name"></div>
                                        <div class="chatbox"></div>
                                        <div class="send"></div>
                                    </div>

                                </div>
                        }
                    }
                    Some(false) => {
                        view! {cx,
                            <div>
                                <Redirect path="/signin" />
                            </div>
                        }
                    }
                    None => {
                        view! {cx, <div><p>"Loading..."</p></div>}
                    }
                }}

        }
        </Suspense>
    }
}

#[component]
fn SignUp(cx: Scope) -> impl IntoView {
    use serde_json;

    let user_element: NodeRef<Input> = create_node_ref(cx);
    let pwd_element: NodeRef<Input> = create_node_ref(cx);

    view! { cx,
        <h1>"Welcome to Leptos!"</h1>
        <form on:submit=move|e: SubmitEvent| {
            e.prevent_default();
            let data = format!(r#"
            {{
                "username": "{}",
                "password": "{}"
            }}"#,
            user_element().expect("<input> to exist").value(),
            pwd_element().expect("<input> to exist").value());

            let payload_json: AuthPayload = serde_json::from_str(&data).unwrap();

            log!("{:?}", payload_json);
            spawn_local(async move {
                sign_up(cx, payload_json).await.unwrap();

            })

        }>
            <input node_ref=user_element />
            <input node_ref=pwd_element />
            <input type="submit" value="Sign Up" />
        </form>
    }
}
