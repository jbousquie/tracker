import './style.css'


import {
  checkPermissions,
  requestPermissions,
  getCurrentPosition,
  watchPosition
} from '@tauri-apps/plugin-geolocation'


let permissions = await checkPermissions()


if (
  permissions.location === 'prompt' ||
  permissions.location === 'prompt-with-rationale'
) {
  permissions = await requestPermissions(['location'])
}


document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div>
    <h1>TauriMobile</h1>
    <p id="geolocation">
    </p>
    <p>cpt : <span id="compteur">0</span></p>
  </div>
`;

var compteur = 0;
setInterval(() => {
  compteur++;
  document.querySelector<HTMLParagraphElement>('#compteur')!.textContent = compteur.toString();
  console.log(compteur);
}, 1000);



if (permissions.location === 'granted') {
  const pos = await getCurrentPosition();

   document.querySelector<HTMLParagraphElement>('#geolocation')!.textContent = `Latitude: ${pos.coords.latitude}, Longitude: ${pos.coords.longitude}`
  
   await watchPosition(
    { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 },
    (pos) => {
      if (pos !== null) {
        document.querySelector<HTMLParagraphElement>('#geolocation')!.textContent = `Latitude: ${pos.coords.latitude}, Longitude: ${pos.coords.longitude}`
      }
    }
  )
}
