/**
 * Auth
 * @author kmturley
 */

let Auth = function($firebaseAuth) {
    var auth = $firebaseAuth();
    return {
        user: null,
        init: function() {
            var me = this;
            auth.$onAuthStateChanged(function(user) {
                if (user) {
                    me.user = {
                        uid: user.uid,
                        name: user.displayName,
                        email: user.email,
                        photo: user.photoURL
                    };
                } else {
                    me.user = null;
                }
            });
        },
        login: function() {
            auth.$signInWithPopup('google');
        },
        logout: function() {
            auth.$signOut();
        }
    };
};

Auth.$inject = ['$firebaseAuth'];

export default Auth;
