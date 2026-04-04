import{test, request} from "@playwright/test"

test("basic API testing", async ({request}) => {
    //let apicontext = await request.newContext()

    let r1=await request.post("https://petstore3.swagger.io/api/v3/pet" , {
        data:{
            name: "doggie",
            status: "available"
          }
          
      })
    console.log(r1);
    console.log(await r1.json);
    console.log(await r1.json().name);
  
  })


        
