import { useContext } from "react";
import { LangContext, UserContext } from "../contexts/contexts";
import { auth, db } from "../config/config";
import { useHistory } from "react-router-dom";
import { CartContext } from "../contexts/cartcontext";
import { WishListContext } from "../contexts/wishlistcontext";
const SignOutButton = ({ MenuToggle, setMenuToggle }) => {
  const { setUser } = useContext(UserContext);
  const { setCart } = useContext(CartContext);
  const { setWishList } = useContext(WishListContext);
  const history = useHistory();
  const { Lang } = useContext(LangContext);
  var time = new Date();
  return (
    <button
      className="btn btn-two txtone border-0 p-2"
      onClick={() => {
        db.collection("Users")
          .doc(auth.currentUser.uid)
          .update({ LastSeen: time.getTime() })
          .then(async () => {
            await auth.signOut();
            setCart([]);
            setWishList([]);
            setUser(null);
            history.push("./home");
            setMenuToggle(!MenuToggle);
          });
      }}
    >
      {Lang == "en" ? "Sign Out" : "تسجيل الخروج"}
    </button>
  );
};

export default SignOutButton;
