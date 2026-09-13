document.getElementById("boton1").onclick=function(){
        let deporte=document.getElementById("deporte").value;
        let equipo=document.getElementById("equipo").value;
        let integrantes=document.getElementById("integrantes").value;
        let camiseta=document.getElementById("camiseta").value;
        alert("El deporte es: "+deporte+"\n"+
                "El equipo es: "+equipo+"\n"+
                "El integrantes es: "+integrantes+"\n"+
                "El camiseta es: "+camiseta);
    };


function agregar(){
    const valor = document.getElementById("deporte2").value;
    if(valor==="") return;
    const li=document.createElement("li");
    li.textContent=valor;
    const btn=document.createElement("button");
    btn.textContent="Eliminar";
    btn.onclick=function(){
        li.remove();
    }
    li.appendChild(btn);
    document.getElementById("lista").appendChild(li);
}


function actualizarContador(){
    const total = document.getElementById("lista2").children.length;
    document.getElementById("contador").textContent=total;
}

function agregar2(){
    const valor = document.getElementById("deporte3").value;
    if(valor==="") return;
    const li=document.createElement("li");
    li.textContent=valor;
    const btn=document.createElement("button");
    btn.textContent="Eliminar";
    btn.onclick=function(){
        li.remove();
        actualizarContador();
    }
    li.appendChild(btn);
    document.getElementById("lista2").appendChild(li);
    actualizarContador();
}