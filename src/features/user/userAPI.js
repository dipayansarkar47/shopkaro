export function fetchLoggedInUserOrders(userId) {
  return new Promise(async (resolve) =>{
    const response = await fetch('http://localhost:8000/orders/?user.id='+userId) 
    const data = await response.json()
    resolve({data})
  }
  );
}


export function fetchLoggedInUser(userId) {
  return new Promise(async (resolve) =>{
    const response = await fetch('http://localhost:8000/users/'+userId) 
    const data = await response.json()
    resolve({data})
  }
  );
}

export function updateUser(update) {
  return new Promise(async (resolve) => {
    const response = await fetch('http://localhost:8000/users/'+update.id, {
      method: 'PATCH',
      body: JSON.stringify(update),
      headers: { 'content-type': 'application/json' },
    });
    const data = await response.json();
    // TODO: on server it will only return some info of user (not password)
    resolve({ data });
  });
}