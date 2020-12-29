
import React, { useState, useEffect } from 'react'
import SimpleBottomNavigation from '../components/navigationBar'
import Graph from "react-graph-vis";
import {connect} from 'react-redux';
// import "./styles.css";



const Search = ({connections}) =>{
  const events = {
    selectEdge: (event, id) => {
      var { nodes, edges } = event;
    //   if(edges.length == 1){ // just so it wont crash
    //     let from = graph['edges'][edges]['from']
    //     let to = graph['edges'][edges]['to']
    //     let fromName1 = graph['nodes'].filter(node => node.id === from)
    //     let fromName =fromName1[0]['label']
    //     let toName1 = graph['nodes'].filter(node => node.id === to)
    //     let toName = toName1[0]['label']
    //     console.log(erdesAdj[fromName][toName]) //number of articels between the 2 nodes of the edge 
    //   }
    },
    selectNode: (event, id) => {
      var { nodes, edges } = event;
    //   console.log(graph['nodes'][nodes]) // u can reach the name of the node
    }
  };
  
  const options = {
    layout: {
      
    },
    edges: {
      color: "#000000"
    },
    height: "500px",
    width: "600px"
  };
  const changeVal = (value) => {
     setValue(value);
  }

  const convert = (paths) => {
    var nodesList = [];
    var nodes = [];
    var edges = [];
    var i = 0;
    let colors = [{color:'red'},{color:'green'},{color:'gold'}];
    

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
  
        edges.push({from: edgeFrom, to: edgeTo, color:colors[path], label: path.toString()});
       
      }
        // if (colors['color'] === 'red'){
        //     colors['color'] = 'green'
        // }
        // else if(colors['color'] === 'green'){
        //   colors['color'] = 'gold'
        // }
        // else{
        //   colors['color'] = 'blue'
        // }   
    }
    console.log("FINISHED CONVERT");
    return {
      nodes: nodes,
      edges: edges
    }
  }

const [value, setValue] = useState("");
const [isSubmmited ,setIsSubmmited] = useState(false)
const [graph, setGraph] = useState( { nodes: [],  edges: []})
const [erdesAdj, setErdesAdj] = useState(undefined)


const lower_upper_case = (str) => {
   var words = str.split(" ");
   var ans = ""
   for(var word in words){
    ans += words[word].charAt(0).toUpperCase() + (words[word].slice(1)) + " "
   }
   ans = ans.substring(0, ans.length-1)
  return ans;
}

 
  const handleSubmit = async  (e, graph) => {
    setIsSubmmited(false)
    e.preventDefault();
    const ksp = require('k-shortest-path')

    var path = ksp.ksp(graph, "Paul Erd\u00f6s", lower_upper_case(value), 4)
    var changed_graph = convert(path);
    await setGraph(changed_graph);
    setIsSubmmited(true)
    
  }

 return (
    
<div className="App" >
          <SimpleBottomNavigation  />
          <div style={{
              position: 'absolute', left: '50%', top: '50%',
              transform: 'translate(-50%, -50%)'
          }}>

              {isSubmmited  && <Graph
                graph={graph}
                options={options}
                events={events}/>}

          </div> 
   
      
          <div style={{
              position: 'absolute', left: '50%', top: '80%',
              transform: 'translate(-50%, -50%)'
          }}>
          <form onSubmit={(e) => handleSubmit(e, connections.processed_data)} >
              <label>
                Name:
                <input type="text"  onChange={(e) => changeVal(e.target.value)} />
              </label>
              <input type="submit" value="Submit" />
          </form> 
          </div>
     </div>
  );
}

function mapStateToProps(state) {
  return {connections: state.connections}
}

export default connect(mapStateToProps, {})(Search);