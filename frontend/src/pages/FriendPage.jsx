import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import {
  getOutgoingFriendReqs,
  getUserFriends,
  sendFriendRequest,
  searchUsers,
} from "../lib/api";
import { 
  CheckCircleIcon, 
  MapPinIcon, 
  UserPlusIcon, 
  SearchIcon,
  XIcon,
  UsersIcon
} from "lucide-react";

import { capitialize } from "../lib/utils";
import FriendCard, { getLanguageFlag } from "../components/FriendCard";
import NoFriendsFound from "../components/NoFriendsFound";

const FriendsPage = () => {
  const queryClient = useQueryClient();
  const [outgoingRequestsIds, setOutgoingRequestsIds] = useState(new Set());
  const [showAddFriendModal, setShowAddFriendModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);

  const { data: friends = [], isLoading: loadingFriends } = useQuery({
    queryKey: ["friends"],
    queryFn: getUserFriends,
  });

  const { data: outgoingFriendReqs } = useQuery({
    queryKey: ["outgoingFriendReqs"],
    queryFn: getOutgoingFriendReqs,
  });

  const { mutate: sendRequestMutation, isPending } = useMutation({
    mutationFn: sendFriendRequest,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["outgoingFriendReqs"] });
      // Optionally close modal after sending request
    },
  });

  useEffect(() => {
    const outgoingIds = new Set();
    if (outgoingFriendReqs && outgoingFriendReqs.length > 0) {
      outgoingFriendReqs.forEach((req) => {
        outgoingIds.add(req.recipient._id);
      });
      setOutgoingRequestsIds(outgoingIds);
    }
  }, [outgoingFriendReqs]);

  const handleSearch = async (query) => {
    if (!query.trim()) {
      setSearchResults([]);
      return;
    }

    setIsSearching(true);
    try {
      const results = await searchUsers(query);
      // Filter out current friends and users with pending requests
      const friendIds = new Set(friends.map(friend => friend._id));
      const filteredResults = results.filter(user => 
        !friendIds.has(user._id) && !outgoingRequestsIds.has(user._id)
      );
      setSearchResults(filteredResults);
    } catch (error) {
      console.error("Search failed:", error);
      setSearchResults([]);
    } finally {
      setIsSearching(false);
    }
  };

  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    
    // Debounce search
    clearTimeout(window.searchTimeout);
    window.searchTimeout = setTimeout(() => {
      handleSearch(query);
    }, 300);
  };

  const closeModal = () => {
    setShowAddFriendModal(false);
    setSearchQuery("");
    setSearchResults([]);
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <div className="container mx-auto space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">Friends</h1>
            <p className="text-base-content opacity-70 mt-1">
              {friends.length} {friends.length === 1 ? 'friend' : 'friends'}
            </p>
          </div>
          <button 
            className="btn btn-primary"
            onClick={() => setShowAddFriendModal(true)}
          >
            <UserPlusIcon className="mr-2 size-4" />
            Add Friend
          </button>
        </div>

        {/* Friends List */}
        {loadingFriends ? (
          <div className="flex justify-center py-12">
            <span className="loading loading-spinner loading-lg" />
          </div>
        ) : friends.length === 0 ? (
          <NoFriendsFound />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {friends.map((friend) => (
              <FriendCard key={friend._id} friend={friend} />
            ))}
          </div>
        )}

        {/* Add Friend Modal */}
        {showAddFriendModal && (
          <div className="modal modal-open">
            <div className="modal-box max-w-2xl">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-lg flex items-center">
                  <UsersIcon className="mr-2 size-5" />
                  Add New Friend
                </h3>
                <button 
                  className="btn btn-sm btn-circle btn-ghost"
                  onClick={closeModal}
                >
                  <XIcon className="size-4" />
                </button>
              </div>

              {/* Search Input */}
              <div className="relative mb-6">
                <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 size-4 opacity-50" />
                <input
                  type="text"
                  placeholder="Search for friends by name or email..."
                  className="input input-bordered w-full pl-9"
                  value={searchQuery}
                  onChange={handleSearchChange}
                />
              </div>

              {/* Search Results */}
              <div className="space-y-4 max-h-96 overflow-y-auto">
                {isSearching ? (
                  <div className="flex justify-center py-8">
                    <span className="loading loading-spinner loading-md" />
                  </div>
                ) : searchQuery && searchResults.length === 0 ? (
                  <div className="text-center py-8">
                    <p className="text-base-content opacity-70">
                      No users found matching "{searchQuery}"
                    </p>
                  </div>
                ) : (
                  searchResults.map((user) => {
                    const hasRequestBeenSent = outgoingRequestsIds.has(user._id);

                    return (
                      <div
                        key={user._id}
                        className="card bg-base-200 p-4"
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3 flex-1">
                            <div className="avatar size-12 rounded-full">
                              <img src={user.profilePic} alt={user.fullName} />
                            </div>

                            <div className="flex-1">
                              <h4 className="font-semibold">{user.fullName}</h4>
                              {user.location && (
                                <div className="flex items-center text-xs opacity-70 mt-1">
                                  <MapPinIcon className="size-3 mr-1" />
                                  {user.location}
                                </div>
                              )}
                              
                              {/* Languages */}
                              <div className="flex flex-wrap gap-1 mt-2">
                                <span className="badge badge-xs badge-secondary">
                                  {getLanguageFlag(user.nativeLanguage)}
                                  {capitialize(user.nativeLanguage)}
                                </span>
                                <span className="badge badge-xs badge-outline">
                                  {getLanguageFlag(user.learningLanguage)}
                                  {capitialize(user.learningLanguage)}
                                </span>
                              </div>
                            </div>
                          </div>

                          {/* Action button */}
                          <button
                            className={`btn btn-sm ${
                              hasRequestBeenSent ? "btn-disabled" : "btn-primary"
                            }`}
                            onClick={() => sendRequestMutation(user._id)}
                            disabled={hasRequestBeenSent || isPending}
                          >
                            {hasRequestBeenSent ? (
                              <>
                                <CheckCircleIcon className="size-3 mr-1" />
                                Sent
                              </>
                            ) : (
                              <>
                                <UserPlusIcon className="size-3 mr-1" />
                                Add
                              </>
                            )}
                          </button>
                        </div>

                        {user.bio && (
                          <p className="text-sm opacity-70 mt-2 pl-15">
                            {user.bio}
                          </p>
                        )}
                      </div>
                    );
                  })
                )}
              </div>

              {/* Modal Actions */}
              <div className="modal-action">
                <button className="btn" onClick={closeModal}>
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FriendsPage;