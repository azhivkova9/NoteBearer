import logo from '/logo.svg';

function Header() {
  return (
    <header className="flex flex-row justify-between items-start w-full px-10 py-4">
      <span className='cursor-pointer'>
        <img src={logo} className='h-9 w-50 object-contain' alt='NoteBearer'/>
      </span>
      <div className='flex flex-row items-center gap-4'>
        <span className='text-l font-bold text-blue-950 underline cursor-pointer hover:text-green-300'>Sign up</span>
        <span className='text-xl font-bold text-slate-50 bg-green-300 rounded-full shadow-xl cursor-pointer py-2 px-5 hover:text-blue-950'>Sign in</span>
      </div>
    </header>
  );
}

export default Header