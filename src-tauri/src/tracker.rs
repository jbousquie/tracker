// https://v2.tauri.app/plugin/file-system/
// https://github.com/tauri-apps/plugins-workspace/tree/v2/plugins/geolocation

// Faire une fonction appelée par le bouton "Start tracking" qui va lancer le tracking de l'UI
// la fonction planifie un Interval avec tokio et appelle la fonction de tracking à intervalle régulier
// la fonction de tracking récupère la position actuelle et l'ajoute à un fichier de log
// elle envoie aussi les dernières positions non reçues par http

// Faire une fonction appelée par le bouton "Stop tracking" qui va arrêter le tracking de l'UI
use std::time::Duration;


struct Trip {
    id: String,
}

#[tauri::command]
pub fn start_tracking() {
    let trip = Trip { id: "123".to_string() };
    tauri::async_runtime::spawn(async move {
        let mut interval = tokio::time::interval(Duration::from_secs(5));
        loop {
            interval.tick().await;
            println!("Tracking trip {}", trip.id);
        }
    });
}