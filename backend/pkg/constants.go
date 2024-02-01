package pkg

var RoutesWithoutAuth = []string{
	"post_login",
	"post_logout",
	"post_signup",
}

var (
	AuthCachePrefix       = "auth_token:"
	UserIDAuthCachePrefix = "auth_user_id:"
)
