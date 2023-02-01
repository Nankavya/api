let details_div=document.getElementById('details-div')
let location_details=document.getElementById("loc-details")

const baseURL=`https://api.geoapify.com/v1/geocode/reverse`
const  ShowLocation = async () =>{
     
    const Locationpromise=new Promise((resolve,reject)=>{
    navigator.geolocation.getCurrentPosition(resolve)
    })
    const Locationdata= await Locationpromise;
    console.log(Locationdata)

   const lat=Locationdata.coords.latitude
    const long=Locationdata.coords.longitude
    console.log("latitude",lat,"longitude",long)

    weather(lat,long)
}

const weather = async (lat,long) =>{
    const url=`${baseURL}?lat=${lat}&lon=${long}&format=json&apiKey=814a5be48e1748cdbd3ef632d5e2be77`
    const weatherdata= fetch(url)
    const weatherdetails=await weatherdata
    const weatherresult=await weatherdetails.json()
    console.log("Geoapify-details",weatherresult)
    Displayweather(weatherresult)
    
}
const Displayweather= (weatherresult) =>{
    const details=[
        {
            Lable:"Name Of Time Zone :",
            value:weatherresult.results[0].timezone.name
        },
        {
            Lable:"Lat :",
            value:weatherresult.results[0].lat
        },
        {
            Lable:"Long :",
            value:weatherresult.results[0].lon
        },{
            Lable:"Offset STD :",
            value:weatherresult.results[0].timezone.offset_STD
        },{
            Lable:"Offset STD Seconds :",
            value:weatherresult.results[0].timezone.offset_STD_seconds
        },{
            Lable:"Offset DST :",
            value:weatherresult.results[0].timezone.offset_DST
        },{
            Lable:"Offset DST Seconds :",
            value:weatherresult.results[0].timezone.offset_DST_seconds
        },{
            Lable:"Country:",
            value:weatherresult.results[0].country
        },{
            Lable:"Postcode :",
            value:weatherresult.results[0].postcode
        },{
            Lable:"City :",
            value:weatherresult.results[0].city
        }]
    
        details_div.style.display='block'
    
        details.forEach((item)=>
        {
        const div=document.createElement('div')
        div.id="div1"
        const Lable=document.createElement('span')
        const value=document.createElement('span')
    
        Lable.textContent=item.Lable
        value.textContent=item.value
    
        div.appendChild(Lable)
        div.appendChild(value)
        
        details_div.appendChild(div)
    
        })
}

window.onload=ShowLocation()




const sub=document.getElementById('btn')
const input=document.getElementById('in-1')


// const ad="Valencia"
async function  fetchfromLocation(){
    let inputValue=input.value
    if(inputValue == '')
    {
        alert("Please provide input")
    }
    else
    {
    console.log(inputValue)

    const fullURL=`https://api.geoapify.com/v1/geocode/search?text=${encodeURIComponent(inputValue)}&apiKey=814a5be48e1748cdbd3ef632d5e2be77`
    const fullURLdata=fetch(fullURL)
    const urldata=await fullURLdata
    const data= await urldata.json()
    console.log("fetchfromLocation",data)
    LocationDisplay(data)
    input.value=''
    }
}

function LocationDisplay(data)
{
    location_details.visibility="block"
    console.log("inside LocationDisplay function")
    console.log('Available data sets',data.features.length)
    const len=data.features.length


   const div_1=document.createElement('div')
    div_1.id="innerdiv"
    location_details.innerHTML=''
    
    if(len >= 1)
    {
        location_details.innerHTML=''
        console.log("result",data.features[0].properties.lat)
        
        const details=[
            {
                Lable:"Location : ",
                value:data.features[0].properties.timezone.name
            },
            {
                Lable:"Lat :",
                value:data.features[0].properties.lat
            }
            ,
            {
                Lable:"Long :",
                value:data.features[0].properties.lon
            }
            ,
            {
                Lable:"Offset STD :",
                value:data.features[0].properties.timezone.offset_DST
            },
            {
                Lable:"Offset STD Seconds :",
                value:data.features[0].properties.timezone.offset_DST_seconds
            },
            {
                Lable:"Offset DST :",
                value:data.features[0].properties.timezone.offset_DST
            },
            {
                Lable:"Offset DST Seconds :",
                value:data.features[0].properties.timezone.offset_STD_seconds
            },
            {
                Lable:"Country:",
                value:data.features[0].properties.country
            },
            {
                Lable:"Postcode :",
                value:data.features[0].properties.postcode
            },
            {
                Lable:"City :",
                value:data.features[0].properties.city
            }
            ]
            details.forEach((item)=>{
                const div=document.createElement('div')
                const Lable=document.createElement('span')
                const value=document.createElement('span')

                Lable.textContent=item.Lable
                value.textContent=item.value
    
                div.appendChild(Lable)
                 div.appendChild(value)
                div_1.appendChild(div)
                location_details.appendChild(div_1)
             })  
    }
     else
    {
        console.log("data not available")
        div_1.textContent="Please enter an Address!"
        div_1.style.color="red"
        div_1.style.borderColor="black"
        console.log("data not available")
    }
    location_details.appendChild(div_1)
}
sub.addEventListener('click',fetchfromLocation)