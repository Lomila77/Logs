import Form from '../components/Form';

function Home() {
    return (
        <div className='h-screen flex w-full flex-col'>
            <h1 className='text-xl text-left p-2 text-[var(--primary)] font-bold drop-shadow-lg '>Logs</h1>
            <Form />
        </div>
    );
}

export default Home;
