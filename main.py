# from icrawler.builtin import GoogleImageCrawler

# # List of paintings and their artists
# paintings = [
#     ("The Persistence of Memory", "Salvador Dal?"),
#     ("The Birth of Venus", "Sandro Botticelli"),
#     ("Les Demoiselles d'Avignon", "Pablo Picasso"),
#     ("Guernica", "Pablo Picasso"),
#     ("The Night Watch", "Rembrandt van Rijn"),
#     ("The Arnolfini Portrait", "Jan van Eyck"),
#     ("Woman with a Pearl Necklace", "Johannes Vermeer"),
#     ("The Death of Sardanapalus", "Eug?ne Delacroix"),
#     ("The School of Athens", "Raphael"),
#     ("The Kiss", "Gustav Klimt"),
#     ("The Triumph of Death", "Pieter Bruegel the Elder"),
#     ("The Hay Wain", "John Constable"),
#     ("The Third of May 1808", "Francisco Goya"),
#     ("The Garden of Earthly Delights", "Hieronymus Bosch"),
#     ("The Flagellation of Christ", "Piero della Francesca"),
#     ("Composition VIII", "Wassily Kandinsky"),
#     ("The Lovers", "Ren? Magritte"),
#     ("The Scream", "Edvard Munch"),
#     ("Broadway Boogie Woogie", "Piet Mondrian"),
#     ("The Large Bathers", "Paul C?zanne"),
#     ("No. 5, 1948", "Jackson Pollock"),
#     ("The Red Studio", "Henri Matisse"),
#     ("A Bar at the Folies-Berg?re", "?douard Manet"),
#     ("The Creation of Adam", "Michelangelo"),
#     ("Self-Portrait with Thorn Necklace and Hummingbird", "Frida Kahlo"),
#     ("American Gothic", "Grant Wood"),
#     ("The Weeping Woman", "Pablo Picasso"),
#     ("The Oath of the Horatii", "Jacques-Louis David"),
#     ("The Way to Calvary", "Pieter Paul Rubens"),
#     ("The Death of Socrates", "Jacques-Louis David"),
#     ("Portrait of Madame X", "John Singer Sargent"),
#     ("The Blue Nude", "Henri Matisse"),
#     ("Lady with an Ermine", "Leonardo da Vinci"),
#     ("The Starry Night", "Vincent van Gogh"),
#     ("Portrait of a Lady", "Rogier van der Weyden"),
#     ("The Madonna of the Rocks", "Leonardo da Vinci"),
#     ("The Wedding at Cana", "Paolo Veronese"),
#     ("The Virgin of the Rocks", "Leonardo da Vinci"),
#     ("Man with a Gold Helmet", "Attributed to Rembrandt"),
#     ("Olympia", "?douard Manet"),
#     ("The Red Room", "Henri Matisse"),
#     ("Portrait of Adele Bloch-Bauer I", "Gustav Klimt"),
#     ("The Girl with a Pearl Earring", "Johannes Vermeer"),
#     ("The Fighting Temeraire", "J.M.W. Turner")
# ]

# # Directory to save images
# root_dir = '/home/saket/downloads/paintings'

# # Create the directory if it does not exist
# import os
# if not os.path.exists(root_dir):
#     os.makedirs(root_dir)

# # Download images
# for painting, artist in paintings:
#     query = f"{painting} {artist} ultra hd"
#     crawler = GoogleImageCrawler(storage={'root_dir': os.path.join(root_dir, painting.replace(' ', '_'))})
#     crawler.crawl(keyword=query, max_num=20)
#     print(f"Downloaded images for '{painting}' by {artist}")

from icrawler.builtin import GoogleImageCrawler

greatest_painters = [
    "Leonardo da Vinci",
    # "Michelangelo", "Rembrandt", "Vincent van Gogh", "Pablo Picasso",
    # "Claude Monet", "Raphael", "Jan van Eyck", "Caravaggio", "J.M.W. Turner",
    # "Diego Velázquez", "Wassily Kandinsky", "Georgia O'Keeffe", "Albrecht Dürer", "Titian",
    # "Paul Cézanne", "Édouard Manet", "Frida Kahlo", "Jackson Pollock", "Henri Matisse",
    # "Gustav Klimt", "Salvador Dalí", "Andy Warhol", "Hieronymus Bosch", "Vermeer",
    # "El Greco", "Paul Gauguin", "Pierre-Auguste Renoir", "Giotto", "Marc Chagall",
    # "Sandro Botticelli", "Piet Mondrian", "Edward Hopper", "Paul Klee", "Eugène Delacroix",
    # "Francisco Goya", "Willem de Kooning", "Joan Miró", "Caspar David Friedrich", "Egon Schiele",
    # "Mark Rothko", "Gustave Courbet", "Edvard Munch", "Roy Lichtenstein", "René Magritte",
    # "Piero della Francesca", "Jean-Michel Basquiat", "Jasper Johns", "Artemisia Gentileschi", "Pieter Bruegel the Elder",
    # "Henri Rousseau", "Camille Pissarro", "Kazimir Malevich", "David Hockney", "Georges Seurat",
    # "Lucian Freud", "Gerhard Richter", "Francis Bacon", "Amedeo Modigliani", "Gustave Doré",
    # "Edgar Degas", "Théodore Géricault", "Willem de Kooning", "Max Ernst", "Henri de Toulouse-Lautrec",
    # "Tamara de Lempicka", "Wassily Kandinsky", "Mary Cassatt", "Dante Gabriel Rossetti", "John Constable",
    # "James Abbott McNeill Whistler", "Pieter Paul Rubens", "Berthe Morisot", "Franz Marc", "Umberto Boccioni",
    # "Filippo Lippi", "Winslow Homer", "John Singer Sargent", "Thomas Gainsborough", "William Blake",
    # "Cy Twombly", "Robert Rauschenberg", "Yves Klein", "Agnes Martin", "Fernand Léger",
    # "Tom Thomson", "Cimabue", "Masaccio", "Jan Vermeer", "Georges Braque",
    # "Anselm Kiefer", "Chuck Close", "Bridget Riley", "Frank Stella", "Joaquín Sorolla",
    # "Maurits Cornelis Escher", "Gustav Moreau", "William Hogarth", "George Stubbs", "Jean-Auguste-Dominique Ingres",
    # "Frederic Edwin Church", "Albert Bierstadt", "Odilon Redon", "Élisabeth Vigée Le Brun", "Käthe Kollwitz",
    # "Gustave Caillebotte", "William-Adolphe Bouguereau", "Pierre Bonnard", "Jacopo Tintoretto", "Paolo Uccello",
    # "Hans Holbein the Younger", "Fra Angelico", "Andrea Mantegna", "Édouard Vuillard", "Joaquín Torres García",
    # "Balthus", "Piero di Cosimo", "Konstantin Yuon", "Giovanni Bellini", "Lucas Cranach the Elder",
    # "Max Beckmann", "Otto Dix", "George Grosz", "Emil Nolde", "Raoul Dufy",
    # "André Derain", "Maurice de Vlaminck", "Chaïm Soutine", "Gino Severini", "Jean Dubuffet",
    # "Lee Krasner", "Helen Frankenthaler", "Joan Mitchell", "Richard Diebenkorn", "Wayne Thiebaud",
    # "Fairfield Porter", "Milton Avery", "Alice Neel", "Lucian Freud", "Jenny Saville",
    # "Marlene Dumas", "Peter Doig", "Neo Rauch", "Cecily Brown", "Takashi Murakami",
    # "Yayoi Kusama", "Jeff Koons", "Damien Hirst", "Banksy", "Ai Weiwei",
    # "Cindy Sherman", "Gerhard Richter", "Anish Kapoor", "Marina Abramović", "Olafur Eliasson",
    # "Kara Walker", "Kehinde Wiley", "Julie Mehretu", "Njideka Akunyili Crosby", "Kerry James Marshall",
    # "Kiki Smith", "Cai Guo-Qiang", "El Anatsui", "William Kentridge", "Mona Hatoum",
    # "Shirin Neshat", "Walton Ford", "John Currin", "Elizabeth Peyton", "Odd Nerdrum",
    # "Zeng Fanzhi", "Yue Minjun", "Zhang Xiaogang", "Xu Bing", "Cai Guo-Qiang",
    # "Takashi Murakami", "Yoshitomo Nara", "Hiroshi Sugimoto", "Yayoi Kusama", "Mariko Mori",
    # "Beatriz Milhazes", "Fernando Botero", "Frida Kahlo", "Diego Rivera", "David Alfaro Siqueiros",
    # "José Clemente Orozco", "Rufino Tamayo", "Joaquín Torres-García", "Wifredo Lam", "Tarsila do Amaral",
    # "Candido Portinari", "Emiliano Di Cavalcanti", "Alfredo Volpi", "Lygia Clark", "Hélio Oiticica",
    # "Cildo Meireles", "Vik Muniz", "Adriana Varejão", "Doris Salcedo", "Oscar Murillo"
]

# # Directory to save images
# root_dir = '/home/saket/downloads/artists'

# # Create the directory if it does not exist
# import os
# if not os.path.exists(root_dir):
#     os.makedirs(root_dir)

# paintingNo = 0
# # Download images
# for artist in greatest_painters:
#     query = f"{artist} painting ultra HD"
#     crawler = GoogleImageCrawler(storage={'root_dir': os.path.join(root_dir, artist)})
#     crawler.crawl(keyword=query, max_num=50)
#     print(f"Downloaded images for by {artist}")


from icrawler.builtin import GoogleImageCrawler

# queries = ["query1", "query2"]
storage_dir = '/home/saket/downloads/artists_paintings'

google_crawler = GoogleImageCrawler(
    feeder_threads=1,
    parser_threads=1,
    downloader_threads=4,
    storage={'root_dir': storage_dir}
)

filters = {
    'size': '=1920x1080',
    # 'size': '>1280x720',

    # 'type': 'photo'
}

for query in greatest_painters:
    google_crawler.crawl(
        keyword=query+"HD painting",
        filters=filters,
        max_num=20,
        min_size=(768, 576),
        file_idx_offset=0
    )
