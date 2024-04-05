## Security measure

### Password :
 *  Usecase : uniquely identify a user (Authenticate user)
 *  User creates -> very simple password
**Encryption Algorithm**  -> SHA256, MD5
* Encryption-> input(Password)[key] -> output (random text) 
* Decryption-> (random text)[key] -> output (password) 
**Problem**
1. user is lazy -> easy passwords
2. for a given input there will be same output
<!-- Dictonary search
abcd ->ajafgadsbfbdsb
1234-> asdjhfgdsgjbdsfh
password -> akjfhdsjhf
 -->
 **Solution**
 1. We use Hashing algorithm : use a algorithm that always create different hash for a given password[no one should be able to decrypt] -> hash -> that is one way
 2. it should be slow
 3. we will not be storing original password anywhere
`We will be using bcrypt that will give us the solution` 
