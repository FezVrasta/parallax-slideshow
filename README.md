# Usage

Setup a new slideshow:

    var mySlideshow = new ParallaxSlideshow($('.slideshow-container), {
        rateo: 0.5,
        blocks: [
            [
                {
                    url: 'image url',
                    depth: '0.00'
                },
                {
                    url: 'image url',
                    depth: '0.30'
                },
                {
                    element: $('.element-to-show')
                    depth: '1.00'
                }
            ],
            [
                // another block
            ]
        ]
    });

Then, to destroy the slideshow and unbind all its events:

    mySlideshow.destroy();

# Options

- `rateo`: Define the aspect rateo of the images showed in the slideshow (eg. 0.5 = 100px width and 500px height);
- `block`: The list of blocks (set of images) which will be showed in the slideshow. Each block is composed by different
  layers, each layer can be an image, or an HTML element;
- `parallaxOptions`: Refer to [Parallax.js documentation](https://github.com/wagerfield) to customize the behavior of
  the parallax effect.;

## Block options

- `url`: Define an URL of an image here if you want to show an image in this layer
- `element`: Assign a jQuery element to this property if you want to show such element in this layer
- `depth`: The depth of a layer within a parallax scene

# Requirements

In order to use this plugin, the following dependencies must be included before ParallaxSlideshow:

- [jQuery](https://jquery.com)
- [Parallax.js]((https://github.com/wagerfield))
