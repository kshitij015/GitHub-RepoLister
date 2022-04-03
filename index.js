var form = document.getElementById("username-form");

form.addEventListener('submit',function(e){
    e.preventDefault();

    document.getElementById("repolist").innerHTML = "";

    var search = document.getElementById("search").value;
    // alert(search)
    var remSpace = search.split(' ').join('');
    // alert(remSpace)
    try{
        fetch("https://api.github.com/users/"+remSpace)
        .then(async(response)=>{
            if(response.ok){

                // const userObj = JSON.parse(response);
                // console.log(userObj.name);
                fetch("https://api.github.com/users/"+remSpace+"/repos")
                .then((result)=>result.json())
                .then((data)=>{
                    ////////here
                    var noOfRepos = data.length;
                    if(noOfRepos==0){
                        document.getElementById("repolist").innerHTML += 
                        `
                            <p style="font-size: 2rem; color: #ffffff">
                                User dosen't have any Repositories.
                            </p>
                        `
                    }
                    else{
                    // for(let i=0;i<noOfRepos;i++){
                    //     // var n = "0";
                    //     // console.log(data.n);

                    //     // var repoData = JSON.parse(data[i]);
                    //     // console.log(repoData.name);
                    //     console.log(data[i].name);
                    // }
                    // console.log(noOfRepos);
                    // console.log(data);
                        PrintTable(data,noOfRepos);
                    }
                })
            }
            else{
                alert("Invalid Username");
            }
        })
        
    }catch(error){
        alert("ERROR!")
    }

})

function PrintTable(props,n)
{
    for(let i=0;i<n;i++)
    {
        var address = props[i].html_url;
        document.getElementById("repolist").innerHTML += 
        `
        <!-- <div class="col-auto mb-3"> --!>
        <div class="card" style="width: 22rem;" onclick="cardClick(props[i].html_url)">
            <a href=${address} style="color: #ffffff" >
                    <h5>
                        ${props[i].name}
                    </h5>
            </a>
                    <p style="display: inline; color:#ffffff">
                        ${props[i].visibility} 
                    </p>
        </div>
        <!-- </div> --!>
        `;
    }
    // for(let i = 0; i<n; i++)
    // {
    //     document.getElementById("repolist").innerHTML += "<p>Hiiiiii</p>";
    // }
    // for(let i = 0; i<n; i++)
    // {
    //     // document.getElementById("repolist").innerHTML += `<p>${props[i].name}</p>`;
    //     console.log(props[i].name);
    // }
}

function cardClick(props){
    console.log("clicked",props);
    window.open(props);
}

