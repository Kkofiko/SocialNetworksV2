import React, { useState, useEffect } from 'react'
export const MakeGraph  = () => {

    const [erdesAdj, setErdesAdj] = useState(undefined)

    useEffect ( async () => {

            const data = await fetch("erdesAdj.js");
            console.log(!!data);
            const jsondata = await data.json();
            setErdesAdj(jsondata);

        
    }, []);

    const transfer = (g) => {
        for (var name in erdesAdj){
          for (var adj in erdesAdj[name]["coauthors"])
            g.setEdge(name, adj , 1);
        }
    }

    const graphlib = require('graphlib');
    let graph = new graphlib.Graph(); // TODO : remove it from here so it would happen before submit
    var g = transfer(graph)
    return g;   
  
    
}