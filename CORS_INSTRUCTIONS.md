# How to Fix CORS Issues for Firebase Storage

Since the necessary command-line tools (`gsutil` or `firebase-tools`) are not installed on your system, you need to apply the CORS configuration manually using the Google Cloud Console.

## Steps

1.  **Open Google Cloud Console:**
    Go to [https://console.cloud.google.com/](https://console.cloud.google.com/).

2.  **Select Your Project:**
    Ensure you have selected the project corresponding to your Firebase project (`cabinet-sorin` or similar).

3.  **Open Cloud Shell:**
    Click the **Activate Cloud Shell** icon in the top right toolbar (it looks like a terminal prompt `>_`).

4.  **Upload the `cors.json` file:**
    - In the Cloud Shell window, click the **three dots** menu icon (⋮) or the **Open Editor** button.
    - If you use the Editor, drag and drop the `cors.json` file from your local project into the Cloud Shell file explorer.
    - Alternatively, you can create the file directly in the terminal:
        ```bash
        nano cors.json
        ```
        Paste the following content and save (Ctrl+O, Enter, Ctrl+X):
        ```json
        [
          {
            "origin": ["*"],
            "method": ["GET", "POST", "PUT", "DELETE", "HEAD", "OPTIONS"],
            "maxAgeSeconds": 3600
          }
        ]
        ```

5.  **Apply the Configuration:**
    Run the following command in the Cloud Shell terminal (replace `YOUR_BUCKET_NAME` with your actual storage bucket name, usually found in `src/lib/firebase.ts` or the Firebase Console under Storage):

    ```bash
    gsutil cors set cors.json gs://YOUR_BUCKET_NAME
    ```
    
    *Tip: You can find your bucket name in your project's `src/lib/firebase.ts` file under `storageBucket`.*

    **Troubleshooting:**
    If `gsutil ls` returns nothing or you get a 404 error:
    
    1.  **Check your project:**
        Run `gcloud config get-value project` to see which project is active.
        If it's not your Firebase project, switch to it:
        ```bash
        gcloud config set project YOUR_PROJECT_ID
        ```
        *(Find your Project ID in the Firebase Console settings).*

    2.  **Alternative: Find Bucket Name in Firebase Console:**
        - Go to the [Firebase Console](https://console.firebase.google.com/).
        - Open your project.
        - Go to **Storage** in the left menu.
        - Copy the URL starting with `gs://` displayed at the top of the files list (or copy the link address and extract the `gs://...` part).
        - It usually looks like `gs://your-project-id.appspot.com` or `gs://your-project-id.firebasestorage.app`.

    3.  **Retry the command:**
        ```bash
        gsutil cors set cors.json gs://YOUR_ACTUAL_BUCKET_NAME
        ```

6.  **Verify:**
    After running the command, try uploading an image again in your application. The CORS error should be resolved.
