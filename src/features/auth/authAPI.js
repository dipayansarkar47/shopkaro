// A mock function to mimic making an async request for data
export function createUser(userData) {
  return new Promise(async (resolve) =>{
    const response = await fetch('http://localhost:8000/users',{
      method: 'POST',
      body: JSON.stringify(userData),
      headers: {'content-type':'application/json'}
    })
    const data = await response.json()
    resolve({data})
  }
  );
}
export function signOut(userId) {
  return new Promise(async (resolve) => {
    // TODO: on server we will remove user session info
    resolve({ data: 'success' });
  });
}
export function checkUser(loginInfo) {
  return new Promise(async (resolve,reject) =>{
    const email = loginInfo.email
    const password = loginInfo.password
    const response = await fetch('http://localhost:8000/users?email='+email)
    const data = await response.json()
    console.log({data})
    if(data.length){
      if(password===data[0].password){
        resolve({data:data[0]})
      }else{
        reject({message:'User not found :('})
      }
    }else{
      reject({message:'User not found :('})
    }
  }
  );
}

export function updateUser(update) {
  return new Promise(async (resolve) =>{
    const response = await fetch('http://localhost:8000/users/'+update.id,{
      method: 'PATCH',
      body: JSON.stringify(update),
      headers: {'content-type':'application/json'}
    })
    const data = await response.json()
    resolve({data})
  }
  );
}