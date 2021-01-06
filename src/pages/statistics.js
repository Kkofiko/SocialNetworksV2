  import SimpleBottomNavigation from '../components/navigationBar'
  import React, { useState, useEffect } from 'react'
  import Graph from "react-graph-vis";
  import MakeGraph from '../Algorithms/makeGraph';  
  import { CommonLoading } from 'react-loadingg';
  import backgroundImage from '../components/background.jpg';
  import {connect} from 'react-redux';
  import TextField from '@material-ui/core/TextField';
  import Autocomplete from '@material-ui/lab/Autocomplete';
  import SendIcon from '@material-ui/icons/Send'; 
  import Button from '@material-ui/core/Button'; 

  const EmptyGraph = {nodes: [],  edges: []};
  const Statistics = ({connections}) =>{
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
    width: "1000px"
  };
  const changeVal = (change, value) => {
    if (change === "start")
      setStart(value);
    else
      setFinish(value);
  }

  const changeNUmberOfPaths = (num) =>{
    setNumOfpaths(num);
  } 

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
          
              if(edge["fromNode"] === start){
                nodes.push({id: i, label: edge["fromNode"], color:{background:'#8096E3'}});
              }
              else{
                nodes.push({id: i, label: edge["fromNode"]});
              }
              i++
        }
        if (!autTo){
              var node =  edge["toNode"]
            
                nodesList.push( {name: node, id : i} )
                if(edge["toNode"] === finish){
                  nodes.push({id: i, label: edge["toNode"], color:{background:'#9BDCDC'}});
  
                }
                else{
                  nodes.push({id: i, label: edge["toNode"]});
                }
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
const [start, setStart] = useState("");
const [finish, setFinish] = useState("");
const [numOfPaths,setNumOfpaths] = useState(1);
const [isSubmmited ,setIsSubmmited] = useState(false)
const [loading ,setLoading] = useState(false)
const [graph, setGraph] = useState(EmptyGraph)



const lower_upper_case = (str) => {
  console.log(str);
   var words = str.split(" ");
   var ans = ""
   for(var word in words){
    ans += words[word].charAt(0).toUpperCase() + (words[word].slice(1)) + " "
   }
   ans = ans.substring(0, ans.length-1)
  return ans;
}

const valid_input = (name) =>{
  for(var v in connections.rawData){
    if(name === v){
      return true
    }
  }
  return false
}

const getNames = (data) => {
  var val = [];
  for(var v in data){
    val.push(v)
  }
  return val
}

useEffect ( async () => {
  console.log(isSubmmited);
  console.log(graph)
  if (graph === EmptyGraph)
    setIsSubmmited(false);
  else {
    setIsSubmmited(true);
    setLoading(false)
  }
  console.log(isSubmmited);
},[graph]);


const optionss = getNames(connections.rawData);

  const handleSubmit = async  (e, graph) => {
    setLoading(true); 
    setGraph(EmptyGraph)
    e.preventDefault();
    const ksp = require('k-shortest-path')
    var name1 =  lower_upper_case(start);
    var name2 =  lower_upper_case(finish);
    if (!valid_input(name1)){
      alert("the name: " + name1 + " wasn't found")
      return;
    }
    if(!valid_input(name2)){
     alert("the name: " + name2 + " wasn't found")
     return;
    }
    setTimeout(()=> {
      var path = ksp.ksp(graph, name1, name2, numOfPaths)
      var changed_graph = convert(path);
      setGraph(changed_graph);
    },500)
    

  } 

 return (
    
    <div className="search"  >
          <SimpleBottomNavigation  />
          {loading && <CommonLoading />}
          <div style={{
              position: 'absolute', left: '50%', top: '48%',
              transform: 'translate(-50%, -50%)',
          }}>

              { isSubmmited && <Graph
                graph={graph}
                options={options}
                events={events}/>}

          </div> 
                
      
          <div style={{
              position: 'absolute', left: '50%', top: '92%',
              transform: 'translate(-50%, -50%)'
          }}>

          <Autocomplete
            id="combo-box-demo"
            options={optionss}
            getOptionLabel={(option) => option}
            style={{ width: 300 }}
            onChange={(e, value) => {changeVal("start",value)} }
            renderInput={(params) => <TextField {...params} type="text" label="author from"
            variant="outlined"
            />}
          />
           <Autocomplete
            id="combo-box-demo1"
            options={optionss}
            getOptionLabel={(option) => option}
            style={{ width: 300 }}
            onChange={(e,value) => changeVal("finish",value)}
            renderInput={(params) => <TextField {...params} type="text" label="author to"
            variant="outlined"
            />}
          />
          *it takes ~15 seconds to find one path
          <br />
            <Autocomplete
            id="combo-box-demo2"
            options={[1,2,3,4,5,6,7,8]}
            getOptionLabel={(option) => option.toString()}
            style={{ width: 300, marginTop: '2%' }}
            onChange={(e, value) => {changeNUmberOfPaths(value)} }
            renderInput={(params) => <TextField {...params} type="text" label="number of paths"
            variant="outlined"
            />}
          />
          <form onSubmit={(e) => handleSubmit(e, connections.processed_data)}  >
                <Button 
                   type="submit" value="Submit" variant="outlined"
                icon={<SendIcon/>} >submit
                 </Button>
            </form>
         
            </div>
     </div>
  );
}

function mapStateToProps(state) {
  return {connections: state.connections}
}

export default connect(mapStateToProps, {})(Statistics);