import {
    LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
  } from 'recharts';
  import SimpleBottomNavigation from '../components/navigationBar'
  // import hardesNumbers from '../jsons/hardesNumbers'
  import Box from '@material-ui/core/Box';
  import { typography } from '@material-ui/system';
  import backgroundImage from '../components/background.jpg';

  
  var numbersCount = [0,0,0,0,0];
  
  
  
  const data = [
    {
      name: '1', uv: numbersCount[1]
    },
    {
      name: '2', uv: numbersCount[2]
    },
    {
      name: '3', uv: numbersCount[3]
    },
    {
      name: '4', uv: numbersCount[4]
    }
  ];
  const search = () =>
  {
    
    return (
      <div className="App" >
          <SimpleBottomNavigation  />
          <div style={{
              position: 'absolute', left: '50%', top: '50%',
              transform: 'translate(-50%, -50%)',

          }}>
        
            <header className="Chart">
                <LineChart
                    width={1000}
                    height={500}
                    data={data}
                    margin={{
                    top: 5, right: 30, left: 20, bottom: 5,
                    }}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="pv" stroke="#8884d8"  />
                    <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
                </LineChart>
                </header>
          </div>  
     </div>
    );
  }
  
  export default search;