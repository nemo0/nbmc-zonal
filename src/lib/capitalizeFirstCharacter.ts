function capitalizeFirstCharacters(input: string): string {
  // Split the input string into an array of words
  const words = input.split(' ');

  // Capitalize the first character of each word
  const capitalizedWords = words.map((word) => {
    // If word is empty or consists of whitespace only, return it as is
    if (!word.trim()) {
      return word;
    }
    // Capitalize the first character of the word and concatenate with the rest
    return word.charAt(0).toUpperCase() + word.slice(1);
  });

  // Join the capitalized words back into a single string
  return capitalizedWords.join(' ');
}

export default capitalizeFirstCharacters;
