import ProfilePage from '../component/ProfilePage';
import Reset from '../component/Reset';

const Setting = () => {
  return (
    <div className="max-w-lg mx-auto space-y-6 py-4">
      <div>
        <h1 className="text-black font-bold text-2xl">Settings</h1>
        <p className="text-slate-500 text-xs mt-1">Manage your profile and data</p>
      </div>
      <ProfilePage />
      <Reset />
    </div>
  );
};

export default Setting;