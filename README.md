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

## Use

To use the tool, download the binary for you system


## Finding UserType

1. Open the Qualtrics Admin page
2. Click on the UserTypes tab
3. Right click on the name of the User Type you need
4. Click on Inspect (this will open the HTML inspector)
5. The User Type id will be enclosed in the 'p1' HTML attribute


