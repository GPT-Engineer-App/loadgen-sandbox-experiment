import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Paw, Heart, Info } from "lucide-react";

const CatBreed = ({ name, description, index }) => (
  <motion.div
    initial={{ opacity: 0, y: 50 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay: index * 0.1 }}
  >
    <Card className="mb-4 overflow-hidden group hover:shadow-lg transition-shadow duration-300">
      <CardHeader className="bg-gradient-to-r from-purple-500 to-pink-500 text-white">
        <CardTitle className="flex items-center">
          <Paw className="mr-2 h-5 w-5" />
          {name}
        </CardTitle>
      </CardHeader>
      <CardContent className="p-4">
        <CardDescription>{description}</CardDescription>
      </CardContent>
    </Card>
  </motion.div>
);

const CatFact = ({ fact, index }) => (
  <motion.div
    initial={{ opacity: 0, x: -50 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ duration: 0.5, delay: index * 0.1 }}
    className="mb-4 p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
  >
    <p className="text-gray-800 flex items-start">
      <Info className="mr-2 h-5 w-5 text-purple-500 flex-shrink-0 mt-1" />
      {fact}
    </p>
  </motion.div>
);

const Index = () => {
  const [activeTab, setActiveTab] = useState("breeds");
  const [likeCount, setLikeCount] = useState(0);
  const [showLikeMessage, setShowLikeMessage] = useState(false);

  const catBreeds = [
    { name: "Siamese", description: "Known for their distinctive color points and blue eyes." },
    { name: "Maine Coon", description: "Large, gentle giants with long, fluffy coats." },
    { name: "Persian", description: "Recognizable by their flat faces and long, luxurious fur." },
    { name: "Bengal", description: "Wild-looking cats with leopard-like spots or marbling." },
    { name: "Sphynx", description: "Hairless cats known for their wrinkled skin and large ears." },
  ];

  const catFacts = [
    "Cats sleep for about 70% of their lives.",
    "A group of cats is called a clowder.",
    "Cats have over 20 vocalizations, including the meow.",
    "A cat's sense of smell is 14 times stronger than a human's.",
    "Cats can jump up to six times their length.",
  ];

  const catImages = [
    "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3a/Cat03.jpg/1200px-Cat03.jpg",
    "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4d/Cat_November_2010-1a.jpg/1200px-Cat_November_2010-1a.jpg",
    "https://upload.wikimedia.org/wikipedia/commons/thumb/b/bb/Kittyply_edit1.jpg/1200px-Kittyply_edit1.jpg",
    "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Sleeping_cat_on_her_back.jpg/1200px-Sleeping_cat_on_her_back.jpg",
  ];

  const handleLike = () => {
    setLikeCount(prevCount => prevCount + 1);
    setShowLikeMessage(true);
    setTimeout(() => setShowLikeMessage(false), 2000);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTab(prevTab => (prevTab === "breeds" ? "facts" : "breeds"));
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-100 to-pink-100 p-8">
      <div className="max-w-4xl mx-auto">
        <motion.h1
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-6xl font-bold mb-6 text-center text-purple-800"
        >
          Feline Fascination
        </motion.h1>

        <Carousel className="mb-8">
          <CarouselContent>
            {catImages.map((src, index) => (
              <CarouselItem key={index}>
                <motion.img
                  src={src}
                  alt={`Cat ${index + 1}`}
                  className="mx-auto object-cover w-full h-[400px] rounded-lg"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                />
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-xl text-gray-700 mb-8"
        >
          Cats are fascinating creatures that have been domesticated for thousands of years. They are known for their
          independence, agility, and affectionate nature. Cats come in various breeds, each with unique characteristics
          and personalities.
        </motion.p>

        <div className="flex justify-center mb-8">
          <Button
            onClick={handleLike}
            className="bg-pink-500 hover:bg-pink-600 text-white font-bold py-2 px-4 rounded-full transition-colors duration-300"
          >
            <Heart className="mr-2 h-5 w-5" /> Like Cats
          </Button>
        </div>

        <AnimatePresence>
          {showLikeMessage && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="text-center mb-4"
            >
              <Badge variant="secondary" className="text-lg">
                Thanks for liking cats! Total likes: {likeCount}
              </Badge>
            </motion.div>
          )}
        </AnimatePresence>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-8">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="breeds">Cat Breeds</TabsTrigger>
            <TabsTrigger value="facts">Cat Facts</TabsTrigger>
          </TabsList>
          <TabsContent value="breeds">
            <h2 className="text-3xl font-semibold mb-4 text-purple-700">Popular Cat Breeds</h2>
            {catBreeds.map((breed, index) => (
              <CatBreed key={index} name={breed.name} description={breed.description} index={index} />
            ))}
          </TabsContent>
          <TabsContent value="facts">
            <h2 className="text-3xl font-semibold mb-4 text-purple-700">Interesting Cat Facts</h2>
            {catFacts.map((fact, index) => (
              <CatFact key={index} fact={fact} index={index} />
            ))}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Index;
