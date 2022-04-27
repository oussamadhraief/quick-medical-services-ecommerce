export async function checkAdmin(email){
    console.log(email)
    const res = await fetch('/api/role', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({email : email})
    }).then(async res => {console.log(res)
      const {data}= await res.json()
      if (!(data.isAdmin)) window.location= '/'
      console.log(data)
      return data.isAdmin
    })
}
    
    
// 