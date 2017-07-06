# frLogger V1.0
a simple js script to log information into local storage

# Version Structure
* Each major release is a number.
* Each update to the current release is a decimal point.

# Languages / Emcoding
* Ecmascript 6 (recomended)
* Hexadecimal

# Setup
* Include the `frLogger.js` extension in your html page `<script src="frLogger.js"></script>`
* Setup call to the database in `sendData()` function
* call `fr.init()`

# Keys
Everything is encoded into Hexadecimal and then stored in localStorage, there are no keys from decryption, just a private method that will 
convert hexadecimal stored values back into string form.

# Methods
* `stringify()` - private, returns the current map converted to JSON and then converted to Hexadecimal.
* `hexEncode()` - private extension, returns a string converted to Hexadecimal.
* `hexDecode()` - private extension, returns a Hexadecimal value converted to a string.
* `addMap(message,type)` - private, adds an Entry to the current map using the key as a timestamp in the (DAYOFMONTH/HH/MM/SS/MS) format and the value as an object containing a full time stamp, the message, and the type.
* `mitigate()` - private, examines the current map to deduce if the program has logged more than once within a 1 second interval. to avoid un-necessary overhead avoid interacting with `localStorage` until its been a full second. 
* `append()` - private, if there is no `localStorage` create it and set it to the current map. If there is `localStorage`, parse the Hexadecimal and reconstruct the map
  and add the new data. convert to JSON and Hexadecimal again and restore. If the current store is over 5000 entries, send it to the database. Reset the map.
* `sendDate()` - private, INSERT YOUR DATA BASE LOGIC HERE --- this is whats called when we dump the user `localStorage`
* `init()` - public, check to see if the user already has a store of logs more than 5000, send it if so. 
* `log()` - public, add a log to `localStorage` under the type of "info"
* `suc()` - public, add a log to `localStorage` under the type of "success"
* `err()` - public, add a log to `localStorage` under the type of "error"
* `showMap()` - public, consoles the current map
* `decode()` - public, returns current map in Hexadecimal format
* `parse()` - public, returns the current `localStorage` as a map
* `local()` - public, returns the current `localStorage` in Hexadecimal format

# Known Issues
* Append else statement could be streamlined.
* Hexadecimal can easilly be decoded.
* Maps arent necesarrily faster than objects.
* Server has to have equivelent public `parse()` method to decode logs.

# Authors
Jacob Marquez - President of Technology, Serobo Tech.
