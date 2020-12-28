import {
    LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
  } from 'recharts';
  import SimpleBottomNavigation from '../components/navigationBar'
  import Box from '@material-ui/core/Box';
  
  import hardesNumbers from '../jsons/hardesNumbers'
  import {homePageAlgo} from '../Algorithms/homePageAlgo'
  
  
  const data = homePageAlgo(hardesNumbers);
  const HomeChar = () =>
  {
    return (  
      <div className="App" >
          <SimpleBottomNavigation  />
          <div style={{
              position: 'absolute', left: '50%', top: '50%',
              transform: 'translate(-50%, -50%)'
          }}>
          <Box component="div" visibility="visible" letterSpacing={1}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor 
          <br/>incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
          <br/> exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure
          <br/> dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
          <br/> Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt
          <br/> mollit anim id est laborum.
          </Box>
          
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

  export default HomeChar;