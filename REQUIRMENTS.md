### A. Technical Requirements

1. **Framework and Languages**
    - The application must be developed using Next.js as the core framework to leverage both server-side rendering and
      static site generation capabilities for optimal performance.
    - TypeScript should be utilized for its statically typed nature, ensuring a more reliable and maintainable codebase.
    - Styling can be achieved through Tailwind CSS for a utility-first approach to design, ensuring responsiveness and
      cross-browser compatibility.

2. **Database**
    - MySQL will be used as the database engine, chosen cus its closer to FOSS than mysql.
    - The database schema must closely mirror the essential functions found in OLX.pl, including user data, product
      listings, categories, bids, and transaction history.

3. **Authentication and Authorization**
    - Implement JWT (JSON Web Tokens) for secure authentication and authorization processes, ensuring that users can
      only access features and information relevant to their user role (e.g., administrator, regular user).

4. **Functionality**
    - The application must include baseline functionalities such as user registration/login, item listing (creation,
      update, deletion), search with filters (category, price, etc.), bidding mechanisms, and transaction history.

5. **Security**
    - Implement standard security practices, including but not limited to SQL injection prevention, XSS (Cross-Site
      Scripting) protection, and secure storage of user credentials.

6. **Testing**
    - Unit tests and integration tests must be written using Jest alongside Testing Library for React components,
      covering at least 80% of the codebase to ensure reliability and functionality correctness.

### B. Practical Requirements

1. **User Experience**
    - The application interface must be user-friendly, accessible, and navigable, closely reflecting the user experience
      provided by platforms like OLX.pl, with adaptions for educational purview.

2. **Documentation**
    - Comprehensive documentation covering setup, deployment, database configuration, and an overview of functionalities
      must be provided to facilitate understanding and ease of use for educational purposes.

3. **Scalability**
    - While initially created for educational use, the application's architecture should be scalable, allowing for
      future expansion or adaptation into different contexts or larger user bases.

### C. Business Requirements (Educational Context)

1. **Objective**
    - To provide a real-world experience in developing a fully functional web application, mirroring the complexities
      and functionalities of live auction house services like OLX.pl with an emphasis on learning and education.

2. **Non-commercial Usage**
    - The project is strictly for educational purposes, such as classroom learning, coding bootcamps, or self-study, and
      must not be commercialized or used to generate revenue.

3. **Legal and Ethical Considerations**
    - All development and usage should adhere to legal and ethical standards, ensuring that any data utilized or
      mimicked (for example, listings or user information) respects privacy laws and is either fictional or obtained
      with consent.