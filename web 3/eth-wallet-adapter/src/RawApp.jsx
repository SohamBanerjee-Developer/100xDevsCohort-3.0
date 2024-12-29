import { createPublicClient, http } from 'viem';
import './App.css'
import { QueryClient, QueryClientProvider, useQuery, useQueryClient } from '@tanstack/react-query';
import { mainnet } from 'viem/chains';

const client = createPublicClient({ 
  chain: mainnet, 
  transport: http(), //protocol used to talk to the bckend and for nodes to talk to each other
});
async function getBalance() {
  const balance = await client.getBalance({address: "0x075c299cf3b9FCF7C9fD5272cd2ed21A4688bEeD"}) 
  return balance.toString();
}

const queryClient = new QueryClient()

function RawApp() {
  return (
    <QueryClientProvider client={queryClient}>
      <Todos />
    </QueryClientProvider>
  )
}

function fetchBalance(){//custom hook
  return useQuery({ queryKey: ['posts'], queryFn: getBalance, refetchInterval: 10 * 1000 })
}

function Todos(){
   // Access the client
  //  const queryClient = useQueryClient()
   // Queries
  const {data, error, isLoading} = fetchBalance()
  //now this library and this query does all catches the error hile fectching provides a loading state variable
  //if the data is not fetched and you can it fetch every few seconds
  // console.log(data);
  
  if(isLoading){
    return <div>
      Loading...
    </div>
  }

  if(error){
    return<div>
      error: {error}
    </div>
  }

  if(data){
    return <>{data}</>
  }
  
}

export default App
