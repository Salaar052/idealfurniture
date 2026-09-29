# IdealFurniture

IdealFurniture is a full-stack website developed for a local furniture business in Pir Mahal, Pakistan.

The website allows customers to browse available furniture, view product details, explore different categories, and contact the business directly for orders and inquiries.

The project was built as a real production website rather than a demo project.

## Features

* Browse furniture products
* Product detail pages
* Categories for beds, sofas, tables, cupboards, chairs and other furniture
* Responsive design for desktop and mobile
* Product images hosted through Cloudinary
* WhatsApp-based ordering and customer inquiries
* Admin dashboard for managing products
* Add, update and delete products
* MongoDB database
* SEO-friendly product pages
* Google Analytics integration
* Contact and showroom information
* Blog integration

## Tech Stack

### Frontend

* Next.js
* React
* TypeScript
* Tailwind CSS

### Backend

* Next.js API routes
* MongoDB
* MongoDB database operations
* Cookie-based admin authentication

### Services

* Cloudinary for image storage and management
* Google Analytics
* WhatsApp for customer communication

## Architecture

The application uses Next.js for both the frontend and backend functionality.

```text
                    Customer
                       |
                       v
              Next.js Application
                 /           \
                /             \
               v               v
        Product Pages      API Routes
                               |
                               v
                           MongoDB
                               |
                               v
                          Product Data

                     Cloudinary
                          |
                          v
                    Product Images

                     WhatsApp
                          |
                          v
                  Customer Inquiries
```

## Product Management

The website includes an admin side for managing the furniture catalog.

Administrators can:

* Add new products
* Update existing products
* Delete products
* Upload product images
* Manage product information
* Organize products by category

Product information and application data are stored in MongoDB, while product images are handled through Cloudinary.

## Ordering

The website does not use a traditional online checkout system.

Instead, customers can browse products and contact the business directly through WhatsApp to discuss availability, pricing, delivery and orders.

This approach was chosen to fit the way the business currently handles customer orders.

## Deployment

The website is deployed and available at:

https://www.idealfurniture.store/

## My Contribution

I designed and developed the website and worked on both the frontend and backend.

My work included:

* Building the website with Next.js and React
* Designing responsive product pages
* Developing the product management functionality
* Integrating MongoDB
* Integrating Cloudinary for product images
* Implementing admin authentication
* Building product CRUD functionality
* Implementing WhatsApp-based ordering
* Adding SEO-related functionality
* Integrating Google Analytics
* Deploying and maintaining the production website

## Project Structure

The project follows a Next.js application structure with frontend components, application routes, API functionality and database integration.

```text
IdealFurniture/
├── app/
├── components/
├── lib/
├── public/
└── ...
```

## Live Website

https://www.idealfurniture.store/

## Business

Ideal Furniture Mart
Shorkot Road, opposite Technical College
Pir Mahal, Pakistan

The website was developed to provide the business with an online product catalog and a way for customers to discover and contact the furniture store online.
