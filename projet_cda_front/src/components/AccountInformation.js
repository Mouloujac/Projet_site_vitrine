import { toast } from 'react-toastify';

const AccountInformation = ({user, setUser}) => {
    console.log(user)

    const handleSubmit = (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);
        const email = formData.get('email');
        const username = formData.get('username');
        const password = formData.get('password');
        setUser({...user, values: {...user.values, email: email, username: username, password: password}});
        const userInscrit = JSON.parse(localStorage.getItem('userInscrit'));
        let index = -1;
        userInscrit.forEach((inscrit, i) => {
            if (inscrit.email === user.values.email) {
                index = i;
            }
        });

        if (index > -1) {
            userInscrit[index].email = email;
            userInscrit[index].username = username;
            userInscrit[index].password = password;
            localStorage.setItem('userInscrit', JSON.stringify(userInscrit));
            toast.success("Vos informations ont bien été modifiées");
        } else {
            toast.error("L'utilisateur n'a pas été trouvé dans la base de données");
        }
    }

    return (
        <div>
            <h2>Mes informations</h2>
            <form className="w-50 my-5" onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="username">Username</label>
                    <input type="text" className="form-control" id="username" name="username"  value={user.name} disabled />
                </div>
                <div className="form-group mt-3">
                    <label htmlFor="email">Email</label>
                    <input type="email" className="form-control" id="email" aria-describedby="emailHelp" name="email" value={user.email} disabled/>
                </div>
                <button type="submit" className="btn btn-primary mt-4">Modifier</button>
            </form>
        </div>
    );
}
export default AccountInformation;