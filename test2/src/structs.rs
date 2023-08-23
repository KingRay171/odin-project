use cfg_if::cfg_if;

cfg_if! {
    if #[cfg(feature = "ssr")] {
        use leptos::*;
        use mongodb::{Database, bson::oid::ObjectId};
        use axum::extract::FromRef;
        use serde::{Serialize, Deserialize};

        #[derive(FromRef, Debug, Clone)]
        pub struct AppState {
            pub leptos_options: LeptosOptions,
            pub conn: Database,
        }

        pub struct Claims {
            username: String,
            exp: usize,
        }
        #[derive(Serialize, Deserialize, Debug, Clone)]
        pub struct User {
            pub username: String,
            pub password: String,
            pub friends: Vec<ObjectId>
        }
        #[derive(Serialize, Deserialize, Debug, Clone)]
        pub struct AggregatedUser {
            pub username: String,
            pub password: String,
            pub friends: Vec<ObjectId>,
            pub friends_full: Vec<Box<User>>
        }
    }
}
