import './style.css'

const invoke = window.__TAURI__.core.invoke;

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
    <h1>TRACKER</h1>
    <p id="geolocation">
    </p>
    <button>Start Tracking</button>
  </div>
`;

const button = document.querySelector<HTMLButtonElement>('button')!;
button.addEventListener('click', async () => {
  invoke('start_tracking');
});

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
