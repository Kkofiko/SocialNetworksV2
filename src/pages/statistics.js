import {
    LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
  } from 'recharts';
  import SimpleBottomNavigation from '../components/navigationBar'
  import React, { useState, useEffect } from 'react'
  import Graph from "react-graph-vis";
  import {MakeGraph} from '../Algorithms/makeGraph'  
  
  
  const Statistics = () =>{
    const events = {
      select: function(event) {
        var { nodes, edges } = event;
      }
    };
    
    const options = {
      layout: {
        improvedLayout: true
      },
      edges: {
        color: "#000000"
      },
      height: "500px",
      width: "600px"
    };
    
  
    
    const convert = (paths) => {
      var nodesList = [];
      var nodes = [];
      var edges = [];
      var i = 0;
      
      for(var path in paths){
        for (var node in paths[path]["edges"]){
          var edge = paths[path]["edges"][node]
          var autFrom = false
          var autTo = false
          for (var v in nodesList){
            if (edge["fromNode"] ==  nodesList[v]["name"])
              autFrom = true
            if (edge["toNode"] == nodesList[v]["name"])
              autTo = true
          }
          if (!autFrom){
                var node =  edge["fromNode"]
                nodesList.push( {name: node, id : i} )
                nodes.push({id: i, label: edge["fromNode"]});
                i++
          }
          if (!autTo){
                var node =  edge["toNode"]
                nodesList.push( {name: node, id : i} )
                nodes.push({id: i, label: edge["toNode"]});
                i++
          }
          for ( var nodeinNodes in nodesList){
            if (nodesList[nodeinNodes]["name"] == edge["fromNode"] ){
              var edgeFrom = nodesList[nodeinNodes]["id"] 
            }
            if (nodesList[nodeinNodes]["name"] == edge["toNode"] ){
              var edgeTo = nodesList[nodeinNodes]["id"] 
            }
          }      
          
          edges.push({from: edgeFrom, to: edgeTo});
        }   
      }
      
      return {
        nodes: nodes,
        edges: edges
      }
    }
    
  
  
    const changeVal = (change, value) => {
      if (change == "start")
        setStart(value);
      else
        setFinish(value);
    }
    const [start, setStart] = useState("");
    const [finish, setFinish] = useState("");
    const [isSubmmited ,setIsSubmmited] = useState(false)
    const [graph, setGraph] = useState( { nodes: [],  edges: []})
    // const [erdesAdj, setErdesAdj] = useState(undefined)

    // useEffect ( async () => {

    //         const data = await fetch("erdesAdj.js");
    //         console.log(!!data);
    //         const jsondata = await data.json();
    //         setErdesAdj(jsondata);

        
    // }, []);
  
    // const transfer = (g) => {
    //   for (var name in erdesAdj){
    //     for (var adj in erdesAdj[name]["coauthors"])
    //       g.setEdge(name, adj , 1);
    //   }
    // }

    const lower_upper_case = (str) => {
      var words = str.split(" ");
      var ans = ""
      for(var word in words){
       ans += words[word].charAt(0).toUpperCase() + (words[word].slice(1)) + " "
      }
      ans = ans.substring(0, ans.length-1)
     return ans;
   }
  
    const handleSubmit = async (e) => { 
      e.preventDefault();
      setIsSubmmited(false)
      var g = MakeGraph();
      // const graphlib = require('graphlib');
      // let g = new graphlib.Graph(); // TODO : remove it from here so it would happen before submit
      // transfer(g)
      const ksp = require('k-shortest-path')
      var path = ksp.ksp(g, lower_upper_case(start), lower_upper_case(finish),3 )
      await setGraph(convert(path));
      setIsSubmmited(true)  
  
    }
  
    return (
      
     
      <div className="App" >
      
        
        <SimpleBottomNavigation  />
        <div style={{
        position: 'absolute', left: '50%', top: '50%',
        transform: 'translate(-50%, -50%)'
    }}> 
       {isSubmmited && <Graph
        graph={graph}
        options={options}
        events={events}/>}
            
            <form onSubmit={(e) => {handleSubmit(e) }} >
              <label>
                  from:
                  <input type="text"  onChange={(e) => changeVal("start", e.target.value)} />
                <br/>
                <br/>
                  to:
                  <input type="text"  onChange={(e) => changeVal("finish", e.target.value)} />
                </label>
                <br/>
                <br/>
                <input type="submit" value="Submit" />
            </form>
        </div>
  
      </div>
    );
  }
  export default Statistics;
  