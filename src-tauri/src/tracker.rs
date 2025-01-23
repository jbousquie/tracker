// https://v2.tauri.app/plugin/file-system/
// https://github.com/tauri-apps/plugins-workspace/tree/v2/plugins/geolocation

// Faire une fonction appelée par le bouton "Start tracking" qui va lancer le tracking de l'UI
// la fonction planifie un Interval avec tokio et appelle la fonction de tracking à intervalle régulier
// la fonction de tracking récupère la position actuelle et l'ajoute à un fichier de log
// elle envoie aussi les dernières positions non reçues par http

// Faire une fonction appelée par le bouton "Stop tracking" qui va arrêter le tracking de l'UI
use std::time::Duration;
use chrono::prelude::*;
use std::fs;

use tauri_plugin_geolocation::GeolocationExt;

// Utiliser l'API Rust de geo-location :
// https://v2.tauri.app/develop/plugins/#exposing-rust-apis
// https://v2.tauri.app/develop/calling-rust/#accessing-an-apphandle-in-commands

struct Trip {
    id: String,
}


#[tauri::command]
pub fn start_tracking(app_handle: tauri::AppHandle) {
    let trip = Trip { id: "123".to_string() };
    tauri::async_runtime::spawn(async move {
        let mut interval = tokio::time::interval(Duration::from_secs(5));
        loop {
            interval.tick().await;
            let pos_get = app_handle.geolocation().get_current_position(None);
            match pos_get {
                Ok(position) => {
                    let lat = position.coords.latitude.to_string();
                    let lon = position.coords.longitude.to_string();
                    let date_string = Utc::now().to_string();
                    write_to_file(&trip.id, &date_string, &lat, &lon);
                }
                Err(_e) => {
                    println!("No position found");
                }
                
            }
        }
    });
}

fn write_to_file(id: &str, date: &str, lat: &str, lon: &str) {
    let content = id.to_string() + "," + date + "," + lat + "," + lon;
    println!("{}", content);
    fs::write("/storage/emulated/0/Documents/trip.txt", content).expect("Unable to write file");
}