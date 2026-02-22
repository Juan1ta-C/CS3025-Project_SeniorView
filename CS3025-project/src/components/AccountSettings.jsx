import { useState, useEffect } from 'react';
import { HelpCircle } from 'lucide-react';
import { toast } from 'sonner';
import logoImage from 'figma:asset/01935386898b6c3b3fc42b23b9e0566d69484d78.png';

export default function Account({ onNavigate, onLogout, userName, userEmail, messagesCount }) {
  const [editInfo, setEditInfo] = useState({
    firstName: userName?.split(' ')[0] || 'Sample',
    lastName: userName?.split(' ')[1] || 'Name',
    email: userEmail || 'sampleemail@gmail.com'
  });

  const [passwordInfo, setPasswordInfo] = useState({
    oldPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const [preferences, setPreferences] = useState({
    textSize: 'Large',
    textToSpeech: true,
    emailNotification: true,
    messageNotification: true
  });

  // Load text size preference from localStorage
  useEffect(() => {
    const savedTextSize = localStorage.getItem('textSize');
    if (savedTextSize) {
      setPreferences(prev => ({ ...prev, textSize: savedTextSize }));
    }
  }, []);

  const handleEditInfoChange = (field, value) => {
    setEditInfo(prev => ({ ...prev, [field]: value }));
  };

  const handlePasswordChange = (field, value) => {
    setPasswordInfo(prev => ({ ...prev, [field]: value }));
  };

  const handlePreferenceToggle = (field) => {
    setPreferences(prev => ({ ...prev, [field]: !prev[field] }));
  };

  const handleSave = () => {
    // Save text size preference to localStorage
    localStorage.setItem('textSize', preferences.textSize);
    toast.success('Settings saved!', {
      description: 'Your account settings have been updated.',
    });
  };

  const handleDeleteAccount = () => {
    if (window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      toast.error('Account deleted', {
        description: 'Your account has been permanently deleted.',
      });
      setTimeout(() => {
        onLogout();
      }, 2000);
    }
  };

  const handleViewPosts = () => {
    onNavigate('bulletin');
  };

  // Generate initials from name
  const getInitials = () => {
    const first = editInfo.firstName?.[0] || 'S';
    const last = editInfo.lastName?.[0] || 'N';
    return `${first}${last}`.toUpperCase();
  };

  // Text size classes
  const textSizeClasses = {
    Small: 'text-sm',
    Medium: 'text-base',
    Large: 'text-lg',
    'Extra Large': 'text-xl',
    '2XL': 'text-2xl',
  };

  const headingSizeClasses = {
    Small: 'text-xl',
    Medium: 'text-2xl',
    Large: 'text-3xl',
    'Extra Large': 'text-4xl',
    '2XL': 'text-5xl',
  };

  const labelSizeClasses = {
    Small: 'text-sm',
    Medium: 'text-base',
    Large: 'text-lg',
    'Extra Large': 'text-xl',
    '2XL': 'text-2xl',
  };

  const currentTextSize = textSizeClasses[preferences.textSize] || textSizeClasses.Large;
  const currentHeadingSize = headingSizeClasses[preferences.textSize] || headingSizeClasses.Large;
  const currentLabelSize = labelSizeClasses[preferences.textSize] || labelSizeClasses.Large;

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-gray-50 to-white flex">
      {/* Left Sidebar */}
      <div className="w-52 bg-gradient-to-br from-cyan-400 via-cyan-300 to-cyan-200 flex flex-col">
        {/* SSA Logo */}
        <div className="p-6">
          <div className="flex flex-col items-center">
            <img src={logoImage} alt="SSA Logo" className="w-full" />
          </div>
        </div>

        {/* Navigation Buttons */}
        <div className="flex-1 flex flex-col px-4 py-8 space-y-4">
          <button
            onClick={() => onNavigate('bulletin')}
            className="bg-white/90 hover:bg-white text-gray-900 font-semibold py-4 px-6 rounded-3xl text-left transition-all shadow-md hover:shadow-lg"
          >
            BULLETIN BOARD
          </button>

          <div className="relative">
            <button
              onClick={() => onNavigate('messaging')}
              className="w-full bg-white/90 hover:bg-white text-gray-900 font-semibold py-4 px-6 rounded-3xl text-left transition-all shadow-md hover:shadow-lg"
            >
              MESSAGING
            </button>
            {messagesCount > 0 && (
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></div>
            )}
          </div>

          <button
            onClick={() => onNavigate('account')}
            className="bg-white text-gray-900 font-semibold py-4 px-6 rounded-3xl text-left shadow-lg"
          >
            ACCOUNT
          </button>
        </div>

        {/* Need Help Button */}
        <div className="p-4">
          <button className="w-full flex items-center justify-center gap-2 bg-white/90 hover:bg-white text-gray-900 font-medium py-3 px-4 rounded-full transition-all shadow-md hover:shadow-lg">
            <div className="w-6 h-6 bg-gray-400 rounded-full flex items-center justify-center text-white">
              <HelpCircle className="w-4 h-4" />
            </div>
            <span className="text-sm">Need help?</span>
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 p-8 md:p-12 overflow-y-auto">
        <div className="max-w-6xl mx-auto">
          {/* Personal Information Section */}
          <div className="bg-gradient-to-r from-cyan-100 to-cyan-200 rounded-3xl p-8 mb-6 relative">
            <button
              onClick={onLogout}
              className="absolute top-8 right-8 bg-cyan-400 hover:bg-cyan-500 text-gray-900 font-bold py-3 px-8 rounded-full transition-all shadow-md"
            >
              LOG OUT
            </button>

            <h2 className={`${currentHeadingSize} font-bold text-gray-900 mb-6`}>Personal Information</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Left: User Info Display */}
              <div className="flex items-start gap-6">
                {/* Avatar Circle */}
                <div className="w-32 h-32 bg-gradient-to-br from-cyan-400 to-cyan-600 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-white text-4xl font-bold">{getInitials()}</span>
                </div>

                {/* User Details */}
                <div className="flex flex-col justify-center">
                  <h3 className={`${currentHeadingSize} font-bold text-gray-900 mb-2`}>
                    {editInfo.firstName} {editInfo.lastName}
                  </h3>
                  <p className={`${currentTextSize} text-gray-700 mb-2`}>
                    <span className="font-semibold">Account Type:</span> Student
                  </p>
                  <p className={`${currentTextSize} text-gray-700`}>{editInfo.email}</p>
                </div>
              </div>

              {/* Right: Edit Info Form */}
              <div>
                <h3 className={`${currentHeadingSize} font-bold text-cyan-600 mb-4`}>EDIT INFO</h3>
                <div className="space-y-4">
                  <div>
                    <label className={`${currentLabelSize} block text-gray-900 font-semibold mb-2`}>First Name:</label>
                    <input
                      type="text"
                      value={editInfo.firstName}
                      onChange={(e) => handleEditInfoChange('firstName', e.target.value)}
                      className={`${currentTextSize} w-full px-4 py-3 rounded-lg bg-gray-200 border-none focus:outline-none focus:ring-2 focus:ring-cyan-400`}
                    />
                  </div>
                  <div>
                    <label className={`${currentLabelSize} block text-gray-900 font-semibold mb-2`}>Last Name:</label>
                    <input
                      type="text"
                      value={editInfo.lastName}
                      onChange={(e) => handleEditInfoChange('lastName', e.target.value)}
                      className={`${currentTextSize} w-full px-4 py-3 rounded-lg bg-gray-200 border-none focus:outline-none focus:ring-2 focus:ring-cyan-400`}
                    />
                  </div>
                  <div>
                    <label className={`${currentLabelSize} block text-gray-900 font-semibold mb-2`}>Email:</label>
                    <input
                      type="email"
                      value={editInfo.email}
                      onChange={(e) => handleEditInfoChange('email', e.target.value)}
                      className={`${currentTextSize} w-full px-4 py-3 rounded-lg bg-gray-200 border-none focus:outline-none focus:ring-2 focus:ring-cyan-400`}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Row: Change Password and Preferences */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            {/* Change Password Section */}
            <div className="bg-gradient-to-r from-cyan-100 to-cyan-200 rounded-3xl p-8">
              <h2 className={`${currentHeadingSize} font-bold text-gray-900 mb-6`}>Change Password</h2>
              <div className="space-y-4">
                <div>
                  <label className={`${currentLabelSize} block text-gray-900 font-semibold mb-2`}>Old Password:</label>
                  <input
                    type="password"
                    value={passwordInfo.oldPassword}
                    onChange={(e) => handlePasswordChange('oldPassword', e.target.value)}
                    className={`${currentTextSize} w-full px-4 py-3 rounded-lg bg-gray-200 border-none focus:outline-none focus:ring-2 focus:ring-cyan-400`}
                  />
                </div>
                <div>
                  <label className={`${currentLabelSize} block text-gray-900 font-semibold mb-2`}>New Password:</label>
                  <input
                    type="password"
                    value={passwordInfo.newPassword}
                    onChange={(e) => handlePasswordChange('newPassword', e.target.value)}
                    className={`${currentTextSize} w-full px-4 py-3 rounded-lg bg-gray-200 border-none focus:outline-none focus:ring-2 focus:ring-cyan-400`}
                  />
                </div>
                <div>
                  <label className={`${currentLabelSize} block text-gray-900 font-semibold mb-2`}>Confirm Password:</label>
                  <input
                    type="password"
                    value={passwordInfo.confirmPassword}
                    onChange={(e) => handlePasswordChange('confirmPassword', e.target.value)}
                    className={`${currentTextSize} w-full px-4 py-3 rounded-lg bg-gray-200 border-none focus:outline-none focus:ring-2 focus:ring-cyan-400`}
                  />
                </div>
              </div>

              <button
                onClick={handleViewPosts}
                className={`${currentTextSize} mt-6 bg-cyan-400 hover:bg-cyan-500 text-gray-900 font-bold py-3 px-8 rounded-full transition-all shadow-md`}
              >
                VIEW YOUR POSTS
              </button>
            </div>

            {/* Preferences Section */}
            <div className="bg-gradient-to-r from-cyan-100 to-cyan-200 rounded-3xl p-8">
              <h2 className={`${currentHeadingSize} font-bold text-gray-900 mb-6`}>Preferences</h2>
              <div className="space-y-4">
                {/* Text Size */}
                <div className="flex items-center justify-between">
                  <label className={`${currentLabelSize} text-gray-900 font-semibold`}>Text Size</label>
                  <select
                    value={preferences.textSize}
                    onChange={(e) => setPreferences(prev => ({ ...prev, textSize: e.target.value }))}
                    className={`${currentTextSize} px-6 py-2 rounded-full bg-gray-200 border-none focus:outline-none focus:ring-2 focus:ring-cyan-400 font-semibold`}
                  >
                    <option value="Small">Small</option>
                    <option value="Medium">Medium</option>
                    <option value="Large">Large</option>
                    <option value="Extra Large">Extra Large</option>
                    <option value="2XL">2XL</option>
                  </select>
                </div>

                {/* Text to Speech */}
                <div className="flex items-center justify-between">
                  <label className={`${currentLabelSize} text-gray-900 font-semibold`}>Text to Speech</label>
                  <button
                    onClick={() => handlePreferenceToggle('textToSpeech')}
                    className={`w-20 h-10 rounded-full relative transition-colors ${
                      preferences.textToSpeech ? 'bg-cyan-400' : 'bg-gray-300'
                    }`}
                  >
                    <span className={`${currentTextSize} absolute inset-0 flex items-center justify-center font-bold text-gray-900`}>
                      {preferences.textToSpeech ? 'ON' : 'OFF'}
                    </span>
                  </button>
                </div>

                {/* Email Notification */}
                <div className="flex items-center justify-between">
                  <label className={`${currentLabelSize} text-gray-900 font-semibold`}>Email Notification</label>
                  <button
                    onClick={() => handlePreferenceToggle('emailNotification')}
                    className={`w-20 h-10 rounded-full relative transition-colors ${
                      preferences.emailNotification ? 'bg-cyan-400' : 'bg-gray-300'
                    }`}
                  >
                    <span className={`${currentTextSize} absolute inset-0 flex items-center justify-center font-bold text-gray-900`}>
                      {preferences.emailNotification ? 'ON' : 'OFF'}
                    </span>
                  </button>
                </div>

                {/* Message Notification */}
                <div className="flex items-center justify-between">
                  <label className={`${currentLabelSize} text-gray-900 font-semibold`}>Message Notification</label>
                  <button
                    onClick={() => handlePreferenceToggle('messageNotification')}
                    className={`w-20 h-10 rounded-full relative transition-colors ${
                      preferences.messageNotification ? 'bg-cyan-400' : 'bg-gray-300'
                    }`}
                  >
                    <span className={`${currentTextSize} absolute inset-0 flex items-center justify-center font-bold text-gray-900`}>
                      {preferences.messageNotification ? 'ON' : 'OFF'}
                    </span>
                  </button>
                </div>
              </div>

              <button
                onClick={handleSave}
                className={`${currentTextSize} mt-6 w-full bg-cyan-400 hover:bg-cyan-500 text-gray-900 font-bold py-3 px-8 rounded-full transition-all shadow-md`}
              >
                SAVE
              </button>
            </div>
          </div>

          {/* Danger Zone Section */}
          <div className="bg-gradient-to-r from-red-300 to-red-400 rounded-3xl p-8">
            <h2 className={`${currentHeadingSize} font-bold text-gray-900 mb-4`}>Danger Zone</h2>
            <div className="flex items-center justify-between">
              <div>
                <h3 className={`${currentHeadingSize} font-bold text-gray-900 mb-2`}>Delete Account</h3>
                <p className={`${currentTextSize} text-gray-900`}>
                  Deleting your account will permanently remove your post and messages
                </p>
              </div>
              <button
                onClick={handleDeleteAccount}
                className={`${currentTextSize} bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-8 rounded-full transition-all shadow-md`}
              >
                DELETE
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
