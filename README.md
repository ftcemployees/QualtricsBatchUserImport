# QualtricsBatchUserImport


## CSV Setup

Ensure you have a CSV file with the following columns CASE SENSITIVE

* firstname
* lastname 
* email 
* password 
* userType 

The userType column must contain the id of the User Type being assigned to the user. 
This should be in the format of "UT_1231234513213." Instructions on how to find the User Type id are below.

## Importing Users

1. Download the binary for your system (Windows, Mac, Linux)
   * You can download a the latest release from [here](https://github.com/ftcemployees/QualtricsBatchUserImport/releases)
2. Save the binary in the same folder as your CSV file
3. Double click the file to run.
4. Enter your Qualtrics API Token 
    * You can find this under Qualtrics IDs in your Account Settings
5. Enter the path to your CSV file
    * For best results, run the binary in the same folder as your CSV file.
6. The tool will upload the new users to Qualtrics. 



## Finding UserType

1. Open the Qualtrics Admin page
2. Click on the UserTypes tab
3. Right click on the name of the User Type you need
4. Click on Inspect (this will open the HTML inspector)
5. The User Type id will be enclosed in the 'p1' HTML attribute

An example UserType:

![Example User Type](./Example%20UserType.png)
