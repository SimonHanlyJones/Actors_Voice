import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase('app.db');



const dropDatabase = () => {
    return new Promise((resolve, reject) => {
      db.transaction(tx => {
        console.log('Dropping tables if they exist...');
        
        tx.executeSql('DROP TABLE IF EXISTS scenes;');
        tx.executeSql('DROP TABLE IF EXISTS projects;');
  
      }, (error) => {
        console.error('Transaction error:', error);
        reject(error);
      }, () => {
        console.log('Tables dropped successfully');
        resolve();  // Resolve the promise after dropping tables
      });
    });
  };

  const createDatabase = () => {
    return new Promise((resolve, reject) => {
      db.transaction(tx => {
        console.log('Creating tables...');
  
        tx.executeSql(
          'CREATE TABLE IF NOT EXISTS projects (projectId INTEGER PRIMARY KEY NOT NULL, title TEXT);', 
          [], 
          (_, result) => {
            console.log('projects table created successfully');
          }, 
          (t, error) => {
            console.error('Error creating projects table:', error);
          }
        );
  
        tx.executeSql(
          "CREATE TABLE IF NOT EXISTS scenes (\
            sceneId INTEGER PRIMARY KEY NOT NULL,\
            projectId INTEGER,\
            title TEXT,\
            FOREIGN KEY (projectId) REFERENCES projects (projectId)\
          );", 
          [], 
          (_, result) => {
            console.log('Scenes table created successfully');
          }, 
          (t, error) => {
            console.error('Error creating scenes table:', error);
          }
        );
      }, (error) => {
        console.error('Transaction error:', error);
        reject(error);
      }, () => {
        console.log('All tables created successfully');
        resolve();
      });
    });
  };

  const insertInitialData = () => {
    return new Promise((resolve, reject) => {
      db.transaction(tx => {
        tx.executeSql('insert into projects (projectId, title) values (?, ?)', [1, 'Misc Scenes']);
        tx.executeSql('insert into projects (projectId, title) values (?, ?)', [2, 'Love Story']);
        tx.executeSql('insert into projects (projectId, title) values (?, ?)', [3, 'Sword Story']);
        // Insert scenes for Love Story
        tx.executeSql('insert into scenes (projectId, title) values (?, ?)', [2, 'Love Scene A']);
        tx.executeSql('insert into scenes (projectId, title) values (?, ?)', [2, 'Love Scene B']);
        // Insert scenes for Sword Story
        tx.executeSql('insert into scenes (projectId, title) values (?, ?)', [3, 'Sword Scene A']);
        tx.executeSql('insert into scenes (projectId, title) values (?, ?)', [3, 'Sword Scene B']);
      }, (error) => {
        console.error('Transaction error:', error);
        reject(error);
      }, () => {
        console.log('Initial data inserted successfully');
        resolve();
      });
    });
  };
  const initialiseDatabase = () => {
    return dropDatabase()
      .then(() => {
        console.log('Database tables dropped successfully.');
        return createDatabase();
      })
      .then(() => {
        console.log('Database tables created successfully.');
        return insertInitialData();
      })
      .then(() => {
        console.log('Initial data inserted successfully.');
      })
      .catch((error) => {
        console.error('Error initializing database:', error);
      });
  };
  export { initialiseDatabase };

// Function returns [{projectId:1, title:"Love Story"},{projectId:2, title:"Sword Story"}] for all scripts, used to populate scripts tab
export const fetchProjectTitles = () => {
    return new Promise((resolve, reject) => {
      db.transaction(tx => {
        tx.executeSql(
          'SELECT title FROM projects',
          [],
          (_, { rows: { _array } }) => {
            console.log('projects fetched: ', _array);
            const titles = _array.map(item => item.title);
            resolve(titles);
          },
          (_, error) => {
            console.error('Error fetching projects: ', error);
            reject(error);
            return false;
          }
        );
      });
    });
  };

  export const fetchProjects = () => {
    return new Promise((resolve, reject) => {
      db.transaction(tx => {
        tx.executeSql(
          'SELECT projectId, title FROM projects',
          [],
          (_, { rows: { _array } }) => {
            console.log('projects fetched: ', _array);
            resolve(_array.map(row => ({ projectId: row.projectId, title: row.title })));
          },
          (_, error) => {
            console.error('Error fetching projects: ', error);
            reject(error);
            return false;
          }
        );
      });
    });
  };

  export const addProject = (title) => {
    return new Promise((resolve, reject) => {
      db.transaction(tx => {
        tx.executeSql(
          'INSERT INTO projects (title) VALUES (?)',
          [title],
          (_, result) => resolve(result.insertId),
          (_, error) => {
            console.error('Transaction error:', error);
            reject(error);
            return true; // to indicate error was handled
          }
        );
      });
    });
  };

  export const addScene = (projectId, title) => {
    return new Promise((resolve, reject) => {
      db.transaction(tx => {
        tx.executeSql(
          'INSERT INTO scenes (projectId, title) VALUES (?, ?)',
          [projectId, title],
          (_, result) => resolve(result),
          (_, error) => {
            console.error('Transaction error:', error);
            reject(error);
            return true; // to indicate error was handled
          }
        );
      });
    });
  };


  
  export const fetchScenes = (projectId) => {
    return new Promise((resolve, reject) => {
      console.log("Fetching scenes for projectId", projectId);
      db.transaction(tx => {
        tx.executeSql(
          'SELECT * FROM scenes Where projectId = ?',
          [projectId],
          (_, { rows: { _array } }) => {
            console.log('Scripts fetched: ', _array);
            resolve(_array.map(row => ({ sceneId: row.sceneId, title: row.title })));
          },
          (_, error) => {
            console.error('Error fetching scenes: ', error);
            reject(error);
            return false;
          }
        );
      });
    });
  };

  