export async function fetchToken() {
  const tokenResponse = await fetch('https://findfalcone.herokuapp.com/token', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
    },
  });

  const { token } = await tokenResponse.json();

  return token;
}

export async function fetchResult(token, expeditions) {
  const resultResponse = await fetch('https://findfalcone.herokuapp.com/find', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json ',
    },
    body: JSON.stringify({
      token,
      planet_names: expeditions.map((expedition) => expedition.planet),
      vehicle_names: expeditions.map((expedition) => expedition.vehicle),
    }),
  });

  return await resultResponse.json();
}
