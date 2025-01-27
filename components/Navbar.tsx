import { auth, signIn, signOut } from '@/auth';
import Image from 'next/image';
import Link from 'next/link';

const Navbar = async () => {
    // we are able to make the component async because it's a server-side component
    const session = await auth();

    return (
        <header className="px-5 py-3 bg-white shadow-sm font-work-sans">
            <nav className="flex justify-between items-center">
                <Link href="/">
                    <Image
                        src={'/logo.png'}
                        alt="Logo"
                        width={144}
                        height={30}
                    />
                </Link>
                <div className="flex items-center space-x-5 text-black">
                    {session && session.user ? (
                        <>
                            <Link href={'/startup/create'}>
                                <span>Create</span>
                            </Link>
                            <form
                                action={async () => {
                                    'use server';
                                    await signOut({ redirectTo: '/' });
                                }}
                            >
                                <button type="submit">Logout</button>
                            </form>
                            <Link href={`/user/${session?.id}`}>
                                <span>{session?.user?.name}</span>
                            </Link>
                        </>
                    ) : (
                        <form
                            action={async () => {
                                'use server'; // making it a server action
                                // but we can't use a server action in a client-side component (a button with an onClick event)
                                await signIn('github');
                            }}
                        >
                            <button type="submit">Login</button>
                        </form>
                    )}
                </div>
            </nav>
        </header>
    );
};

export default Navbar;

// Reference notes:
/* 
<button onClick={async () => {
    'use server'; // making it a server action
    // but we can't use a server action in a client-side component (a button with an onClick event)
    await signIn('github');
}}>
    <span>Login</span>
</button> 
*/
