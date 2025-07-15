import Form from '../components/Form';
import Logs from '../components/Logs';

function Home() {
    return (
        <div className='h-screen flex w-full flex-col'>
            <h1 className='text-xl text-left p-2 text-[var(--primary)] font-bold drop-shadow-lg '>Logs</h1>
            <Logs />
            <Form />
        </div>
    );
}

export default Home;
