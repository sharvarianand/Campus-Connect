import { Models } from "appwrite";
// import { useToast } from "@/components/ui/use-toast";
import { Loader, PostCard, UserCard } from "@/components/shared";
import { useGetUsers } from "@/lib/react-query/queries";

const Home = () => {
  // const { toast } = useToast();

  // Get posts from localStorage
  const localPosts = JSON.parse(localStorage.getItem('posts') || '[]');
  const {
    data: creators,
    isLoading: isUserLoading,
    isError: isErrorCreators,
  } = useGetUsers(10);

  // Mock data for posts
  const mockPosts = {
    documents: [
      {
        $id: "1",
        $collectionId: "mockCollection",
        $databaseId: "mockDatabase",
        $createdAt: new Date().toISOString(),
        $updatedAt: new Date().toISOString(),
        $permissions: [],
        creator: {
          $id: "user1",
          $collectionId: "mockCollection",
          $databaseId: "mockDatabase",
          $createdAt: new Date().toISOString(),
          $updatedAt: new Date().toISOString(),
          $permissions: [],
          name: "Sarah Johnson",
          username: "sarahj",
          imageUrl: "/assets/icons/profile-placeholder.svg"
        },
        imageUrl: "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=600&q=80",
        caption: "Just finished my final presentation! 🎓 #StudentLife #CampusConnect",
        location: "University Library",
        tags: ["StudentLife", "CampusConnect"],
        likes: [],
        saves: [],
      },
      {
        $id: "2",
        $collectionId: "mockCollection",
        $databaseId: "mockDatabase",
        $createdAt: new Date().toISOString(),
        $updatedAt: new Date().toISOString(),
        $permissions: [],
        creator: {
          $id: "user2",
          $collectionId: "mockCollection",
          $databaseId: "mockDatabase",
          $createdAt: new Date().toISOString(),
          $updatedAt: new Date().toISOString(),
          $permissions: [],
          name: "Mike Chen",
          username: "mikechen",
          imageUrl: "/assets/icons/profile-placeholder.svg"
        },
        imageUrl: "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=600&q=80",
        caption: "Great study session with the team! 📚 #StudyGroup #Finals",
        location: "Student Center",
        tags: ["StudyGroup", "Finals"],
        likes: [],
        saves: [],
      },
      {
        $id: "3",
        $collectionId: "mockCollection",
        $databaseId: "mockDatabase",
        $createdAt: new Date().toISOString(),
        $updatedAt: new Date().toISOString(),
        $permissions: [],
        creator: {
          $id: "user3",
          $collectionId: "mockCollection",
          $databaseId: "mockDatabase",
          $createdAt: new Date().toISOString(),
          $updatedAt: new Date().toISOString(),
          $permissions: [],
          name: "Emily Davis",
          username: "emilyd",
          imageUrl: "/assets/icons/profile-placeholder.svg"
        },
        imageUrl: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80",
        caption: "Campus event was a blast! 🎉 #CampusLife #Events",
        location: "Main Quad",
        tags: ["CampusLife", "Events"],
        likes: [],
        saves: [],
      }
    ]
  };

  // Mock data for creators
  const mockCreators = {
    documents: [
      {
        $id: "user1",
        $collectionId: "mockCollection",
        $databaseId: "mockDatabase",
        $createdAt: new Date().toISOString(),
        $updatedAt: new Date().toISOString(),
        $permissions: [],
        name: "Sarah Johnson",
        username: "sarahj",
        imageUrl: "/assets/icons/profile-placeholder.svg",
        bio: "Computer Science Major | Student Council"
      },
      {
        $id: "user2",
        $collectionId: "mockCollection",
        $databaseId: "mockDatabase",
        $createdAt: new Date().toISOString(),
        $updatedAt: new Date().toISOString(),
        $permissions: [],
        name: "Mike Chen",
        username: "mikechen",
        imageUrl: "/assets/icons/profile-placeholder.svg",
        bio: "Engineering Student | Campus Ambassador"
      },
      {
        $id: "user3",
        $collectionId: "mockCollection",
        $databaseId: "mockDatabase",
        $createdAt: new Date().toISOString(),
        $updatedAt: new Date().toISOString(),
        $permissions: [],
        name: "Emily Davis",
        username: "emilyd",
        imageUrl: "/assets/icons/profile-placeholder.svg",
        bio: "Art & Design | Student Club Leader"
      },
      {
        $id: "user4",
        $collectionId: "mockCollection",
        $databaseId: "mockDatabase",
        $createdAt: new Date().toISOString(),
        $updatedAt: new Date().toISOString(),
        $permissions: [],
        name: "Alex Thompson",
        username: "alext",
        imageUrl: "https://randomuser.me/api/portraits/men/4.jpg",
        bio: "Business Major | Sports Team Captain"
      }
    ]
  };

  if (isErrorCreators) {
    return (
      <div className="flex flex-1">
        <div className="home-container">
          <p className="body-medium text-light-1">Something bad happened</p>
        </div>
        <div className="home-creators">
          <p className="body-medium text-light-1">Something bad happened</p>
        </div>
      </div>
    );
  }

  const displayPosts = (localPosts && localPosts.length > 0) ? { documents: localPosts } : mockPosts;
  const displayCreators = (creators && creators.documents && creators.documents.length > 0) ? creators : mockCreators;

  return (
    <div className="flex flex-1">
      <div className="home-container">
        <div className="home-posts">
          <h2 className="h3-bold md:h2-bold text-left w-full">Campus Feed</h2>
          {displayPosts.documents.length === 0 ? (
            <p className="text-light-4 mt-10 text-center w-full">No posts found</p>
          ) : (
            <ul className="flex flex-col flex-1 gap-9 w-full ">
              {displayPosts.documents.map((post: Models.Document) => (
                <li key={post.$id} className="flex justify-center w-full">
                  <PostCard post={post} />
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      <div className="home-creators">
        <h3 className="h3-bold text-light-1">Top Campus Creators</h3>
        {isUserLoading && !displayCreators ? (
          <Loader />
        ) : displayCreators.documents.length === 0 ? (
          <p className="text-light-4 mt-10 text-center w-full">No creators found</p>
        ) : (
          <ul className="grid 2xl:grid-cols-2 gap-6">
            {displayCreators.documents.map((creator) => (
              <li key={creator.$id}>
                <UserCard user={creator} />
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Home;
