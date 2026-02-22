import { useState } from 'react';
import { HelpCircle, Clock } from 'lucide-react';
import { toast } from 'sonner';

export default function YourPosts({ onNavigate, onLogout, posts, onEditPost, onDeletePost, messagesCount }) {
  const [editingPost, setEditingPost] = useState(null);
  const [editForm, setEditForm] = useState({
    title: '',
    category: '',
    needHelp: '',
    canOffer: ''
  });

  // Filter to show only user's posts
  const userPosts = posts.filter(post => post.author === 'YOU');

  const handleEditClick = (post) => {
    setEditingPost(post.id);
    setEditForm({
      title: post.title,
      category: post.category,
      needHelp: post.needHelp[0] || '',
      canOffer: post.canOffer[0] || ''
    });
  };

  const handleSaveEdit = (postId) => {
    const updatedPost = {
      ...posts.find(p => p.id === postId),
      title: editForm.title.toUpperCase(),
      category: editForm.category,
      needHelp: [editForm.needHelp],
      canOffer: [editForm.canOffer]
    };
    
    onEditPost(postId, updatedPost);
    setEditingPost(null);
    toast.success('Post updated!', {
      description: 'Your changes have been saved.',
    });
  };

  const handleCancelEdit = () => {
    setEditingPost(null);
    setEditForm({
      title: '',
      category: '',
      needHelp: '',
      canOffer: ''
    });
  };

  const handleDelete = (postId, postTitle) => {
    if (window.confirm(`Are you sure you want to delete "${postTitle}"? This action cannot be undone.`)) {
      onDeletePost(postId);
      toast.success('Post deleted', {
        description: 'Your post has been removed from the bulletin board.',
      });
    }
  };

  const handleEditFormChange = (field, value) => {
    setEditForm(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-gray-50 to-white flex">
      {/* Left Sidebar */}
      <div className="w-52 bg-gradient-to-br from-cyan-400 via-cyan-300 to-cyan-200 flex flex-col">
        {/* SSA Logo */}
        <div className="p-6">
          <div className="flex flex-col items-center">
            <img src="src/Image.png" alt="SSA Logo" />
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
            className="bg-white/90 hover:bg-white text-gray-900 font-semibold py-4 px-6 rounded-3xl text-left transition-all shadow-md hover:shadow-lg"
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
      <div className="flex-1 p-8 md:p-12 overflow-y-auto relative">
        <div className="max-w-5xl mx-auto">
          {/* Title */}
          <h1 className="text-5xl font-bold text-gray-900 mb-8">YOUR CURRENT POSTS</h1>

          {/* Posts List */}
          <div className="space-y-6 mb-24">
            {userPosts.length === 0 ? (
              <div className="bg-gray-100 rounded-3xl p-12 text-center">
                <p className="text-2xl text-gray-500">You haven't created any posts yet.</p>
                <button
                  onClick={() => onNavigate('create')}
                  className="mt-6 bg-gradient-to-r from-cyan-400 to-cyan-500 hover:from-cyan-500 hover:to-cyan-600 text-gray-900 font-bold py-3 px-8 rounded-full transition-all shadow-lg"
                >
                  Create Your First Post
                </button>
              </div>
            ) : (
              userPosts.map(post => (
                <div key={post.id} className="bg-white rounded-3xl p-8 shadow-lg">
                  {editingPost === post.id ? (
                    // Edit Mode
                    <div className="space-y-4">
                      <div>
                        <label className="block text-gray-900 font-bold text-lg mb-2">Title:</label>
                        <input
                          type="text"
                          value={editForm.title}
                          onChange={(e) => handleEditFormChange('title', e.target.value)}
                          className="w-full px-4 py-3 rounded-lg border-2 border-gray-300 focus:border-cyan-400 focus:outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-gray-900 font-bold text-lg mb-2">Category:</label>
                        <select
                          value={editForm.category}
                          onChange={(e) => handleEditFormChange('category', e.target.value)}
                          className="w-full px-4 py-3 rounded-lg border-2 border-gray-300 focus:border-cyan-400 focus:outline-none"
                        >
                          <option value="Physical Labour">Physical Labour</option>
                          <option value="Cooking">Cooking</option>
                          <option value="Crafts">Crafts</option>
                          <option value="Technology">Technology</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-gray-900 font-bold text-lg mb-2">I need help with:</label>
                        <textarea
                          value={editForm.needHelp}
                          onChange={(e) => handleEditFormChange('needHelp', e.target.value)}
                          rows={3}
                          className="w-full px-4 py-3 rounded-lg border-2 border-gray-300 focus:border-cyan-400 focus:outline-none resize-none"
                        />
                      </div>
                      <div>
                        <label className="block text-gray-900 font-bold text-lg mb-2">I can offer:</label>
                        <textarea
                          value={editForm.canOffer}
                          onChange={(e) => handleEditFormChange('canOffer', e.target.value)}
                          rows={3}
                          className="w-full px-4 py-3 rounded-lg border-2 border-gray-300 focus:border-cyan-400 focus:outline-none resize-none"
                        />
                      </div>
                      <div className="flex gap-3 justify-end pt-4">
                        <button
                          onClick={handleCancelEdit}
                          className="px-6 py-2 rounded-full border-2 border-gray-300 text-gray-700 font-semibold hover:bg-gray-50 transition-colors"
                        >
                          Cancel
                        </button>
                        <button
                          onClick={() => handleSaveEdit(post.id)}
                          className="px-6 py-2 rounded-full bg-cyan-400 hover:bg-cyan-500 text-gray-900 font-semibold transition-colors"
                        >
                          Save Changes
                        </button>
                      </div>
                    </div>
                  ) : (
                    // View Mode
                    <>
                      <h2 className="text-3xl font-bold text-gray-900 mb-4">{post.title}</h2>
                      <div className="mb-2">
                        <span className="font-semibold text-gray-900">I need help with:</span>
                        <p className="text-gray-700 ml-0 mt-1">{post.needHelp.join(', ')}</p>
                      </div>
                      <div className="mb-6">
                        <span className="font-semibold text-gray-900">I can offer:</span>
                        <p className="text-gray-700 ml-0 mt-1">{post.canOffer.join(', ')}</p>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className="flex items-center gap-2 text-gray-600">
                            <Clock className="w-5 h-5" />
                            <span>{post.timestamp}</span>
                          </div>
                          <span className="bg-cyan-200 text-cyan-900 px-4 py-1 rounded-full text-sm font-medium">
                            {post.category}
                          </span>
                        </div>
                        <div className="flex gap-3">
                          <button
                            onClick={() => handleEditClick(post)}
                            className="px-8 py-2 rounded-full bg-cyan-400 hover:bg-cyan-500 text-gray-900 font-semibold transition-colors shadow-md"
                          >
                            EDIT
                          </button>
                          <button
                            onClick={() => handleDelete(post.id, post.title)}
                            className="px-8 py-2 rounded-full bg-red-500 hover:bg-red-600 text-white font-semibold transition-colors shadow-md"
                          >
                            DELETE
                          </button>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              ))
            )}
          </div>
        </div>

        {/* Return Button - Bottom Right */}
        <div className="fixed bottom-8 right-8">
          <button
            onClick={() => onNavigate('account')}
            className="bg-cyan-400 hover:bg-cyan-500 text-gray-900 font-bold py-3 px-10 rounded-full transition-all shadow-lg hover:shadow-xl"
          >
            RETURN
          </button>
        </div>
      </div>
    </div>
  );
}