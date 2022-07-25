const autos = require('./concesionaria.js');

let concesionaria = {
   autos: autos, 
   buscarAuto: function(patente){
        let autoBuscar = autos.find((auto) => auto.patente == patente);
        if(autoBuscar)
            return autoBuscar;
        else    
            return null;
    },
    venderAuto: function(patente){
        let autoVendido = this.buscarAuto(patente);
        autoVendido.vendido = true;
        return autoVendido;
    },
    autosParaLaVenta: function(){
        let listaAutos = autos;
        let paraLaVenta = listaAutos.filter((auto) => auto.vendido == false);
        return paraLaVenta;
    },
    autosNuevos: function(){
        let listaAutos = autos;
        let nuevos = listaAutos.filter((auto) => auto.km < 100);
        return nuevos;
    },
    listaDeVentas: function(){
        let listaAutos = this.autos;
        let vendidos = listaAutos.filter((auto) => auto.vendido == true);
        let montoVendidos = vendidos.map((auto) => auto.precio);
        return montoVendidos;
  
     },
     totalDeVentas:function(){
        let listaVendidos = this.listaDeVentas()
        let totalVentas = listaVendidos.reduce((acum, num)=> acum + num);
        return totalVentas;
     },
     puedeComprar:function(auto, persona){
        if(auto.precio < persona.capacidadDePagoTotal && auto.precio/auto.cuotas < persona.capacidadDePagoEnCuotas)
            return true;
        else 
           return false;  
     },

     autosQuePuedeComprar: function(persona){
        let listaParaVenta = this.autosParaLaVenta();
        let puedeComprar = listaParaVenta.filter((auto) => this.puedeComprar(auto, persona) == true);
        return puedeComprar;
  
     }

};

console.log(concesionaria.puedeComprar(autos.autos[0], autos.persona));
