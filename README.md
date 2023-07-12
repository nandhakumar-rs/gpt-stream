![GPT Stream](/logo.png)

A simple full stack web app demonstrating how to consume OpenAI Stream.
## Technologies Used

-  Next.js
-  Express.js
-  OpenAI

## Getting Started

> Make sure to use Node.js version >= 14.16.1
### Step 1: Clone the repository



```bash git clone https://github.com/nandhakumar-rs/gpt-stream.git ``` 

### Step 2: Install the Dependencies

Run `npm i` in the root of the project (This will install frontend dependencies)

Then, Navigate to `backend` directory

Run `npm i` in the root of the project (This will install backend dependencies)

### Step 3: Add Environment Variable

Create `.env` in the root of the project and add the following

```bash
API_ENDPOINT=http://localhost:4000
 ```


Then, Navigate to `backend` directory
Create `.env` inside the `backend` directory and add the following

```bash
# Port
PORT=4000

#Open AI
OPEN_AI_KEY= # replace with your OpenAI API Key
 ```

### Step 4: Run the App

To run the frontend app, execute `npm run dev` in the root of the project

To run the backend app, navigate to backend app, then execute `npm run start`
