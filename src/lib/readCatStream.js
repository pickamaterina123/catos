export const readStream = async (req) => {
    const reader = req.body.getReader();
    const chunks = [];

    try {
        while (true) {
            const { done, value } = await reader.read();

            if (done) {
                // End of stream
                break;
            }

            // Append the received chunk to the array
            chunks.push(value);
        }

        // Concatenate all chunks into a single Uint8Array
        const concatenatedChunks = new Uint8Array(
            chunks.reduce((acc, chunk) => acc + chunk.length, 0)
        );

        let lengthSoFar = 0;
        for (const chunk of chunks) {
            concatenatedChunks.set(chunk, lengthSoFar);
            lengthSoFar += chunk.length;
        }

        // Create a Blob from the concatenated chunks
        const imageBlob = new Blob([concatenatedChunks], { type: 'image/jpeg' }); // Adjust the type as per your image format

        // Create an object URL for the Blob
        const imageURL = URL.createObjectURL(imageBlob);

        // Create an image element
        return imageURL;
    } catch (error) {
        // Handle errors
        console.error("Error reading the stream:", error);
    } finally {
        // Release the reader lock
        reader.releaseLock();
    }

};