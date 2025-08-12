```jsx
<div style={{
  fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
  maxWidth: '900px',
  margin: '20px auto',
  padding: '0 15px'
}}>
  <div style={{
    display: 'flex',
    flexDirection: 'column',
    gap: '30px'
  }}>
    {/* Main Flow Diagram */}
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      border: '1px solid #e0e0e0',
      borderRadius: '8px',
      overflow: 'hidden',
      boxShadow: '0 2px 8px rgba(0,0,0,0.05)'
    }}>
      <div style={{
        backgroundColor: '#f7f9fc',
        padding: '15px 20px',
        borderBottom: '1px solid #e0e0e0'
      }}>
        <h3 style={{margin: '0', color: '#333', fontSize: '18px'}}>How Cost Categories and Perspectives Work Together</h3>
      </div>
      
      <div style={{
        display: 'flex',
        padding: '25px',
        gap: '20px',
        alignItems: 'center',
        flexWrap: 'wrap'
      }}>
        {/* Cost Categories Box */}
        <div style={{
          flex: '1 1 300px',
          border: '1px solid #6366f1',
          borderRadius: '6px',
          padding: '15px',
          backgroundColor: '#f5f7ff'
        }}>
          <h4 style={{margin: '0 0 10px 0', color: '#4f46e5', fontSize: '16px'}}>Cost Categories</h4>
          <p style={{margin: '0 0 10px 0', fontSize: '14px'}}>Organize and normalize your cost data</p>
          <ul style={{margin: '0', paddingLeft: '20px', fontSize: '14px'}}>
            <li>Environment (Prod, Dev, Test)</li>
            <li>Business Unit (Marketing, Engineering)</li>
            <li>Customer (Client A, Client B)</li>
            <li>Project (Alpha, Beta)</li>
          </ul>
        </div>
        
        {/* Arrow */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          padding: '0 10px'
        }}>
          <div style={{
            width: '40px',
            height: '2px',
            backgroundColor: '#6b7280',
            position: 'relative'
          }}></div>
          <div style={{
            width: '0',
            height: '0',
            borderTop: '6px solid transparent',
            borderBottom: '6px solid transparent',
            borderLeft: '8px solid #6b7280'
          }}></div>
        </div>
        
        {/* Perspectives Box */}
        <div style={{
          flex: '1 1 300px',
          border: '1px solid #10b981',
          borderRadius: '6px',
          padding: '15px',
          backgroundColor: '#ecfdf5'
        }}>
          <h4 style={{margin: '0 0 10px 0', color: '#059669', fontSize: '16px'}}>Perspectives</h4>
          <p style={{margin: '0 0 10px 0', fontSize: '14px'}}>Analyze and visualize your categorized data</p>
          <ul style={{margin: '0', paddingLeft: '20px', fontSize: '14px'}}>
            <li>Filter by categories</li>
            <li>Group by categories</li>
            <li>Compare across time periods</li>
            <li>Create recurring dashboards</li>
          </ul>
        </div>
      </div>
    </div>
    
    {/* Use Cases */}
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      gap: '20px'
    }}>
      <h4 style={{margin: '5px 0', color: '#4b5563', fontSize: '16px'}}>Common Use Cases</h4>
      
      <div style={{
        display: 'flex',
        gap: '20px',
        flexWrap: 'wrap'
      }}>
        {/* Use Case 1 */}
        <div style={{
          flex: '1 1 250px',
          border: '1px solid #e0e0e0',
          borderRadius: '6px',
          padding: '15px',
          backgroundColor: 'white',
          boxShadow: '0 1px 3px rgba(0,0,0,0.05)'
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            marginBottom: '10px',
            gap: '8px'
          }}>
            <div style={{
              width: '24px',
              height: '24px',
              borderRadius: '50%',
              backgroundColor: '#4f46e5',
              color: 'white',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '14px',
              fontWeight: 'bold'
            }}>1</div>
            <h5 style={{margin: '0', fontSize: '15px'}}>Filtering by Environment</h5>
          </div>
          <div style={{fontSize: '14px'}}>
            <p style={{margin: '0 0 8px 0'}}><strong>Cost Category:</strong> Environment</p>
            <p style={{margin: '0 0 8px 0'}}><strong>Values:</strong> Prod, Staging, Dev</p>
            <p style={{margin: '0 0 8px 0'}}><strong>Perspective:</strong> Filter to Environment = Prod</p>
            <p style={{margin: '0', color: '#4b5563'}}><em>Result: View only production costs</em></p>
          </div>
        </div>
        
        {/* Use Case 2 */}
        <div style={{
          flex: '1 1 250px',
          border: '1px solid #e0e0e0',
          borderRadius: '6px',
          padding: '15px',
          backgroundColor: 'white',
          boxShadow: '0 1px 3px rgba(0,0,0,0.05)'
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            marginBottom: '10px',
            gap: '8px'
          }}>
            <div style={{
              width: '24px',
              height: '24px',
              borderRadius: '50%',
              backgroundColor: '#059669',
              color: 'white',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '14px',
              fontWeight: 'bold'
            }}>2</div>
            <h5 style={{margin: '0', fontSize: '15px'}}>Grouping by Business Unit</h5>
          </div>
          <div style={{fontSize: '14px'}}>
            <p style={{margin: '0 0 8px 0'}}><strong>Cost Category:</strong> Business Unit</p>
            <p style={{margin: '0 0 8px 0'}}><strong>Values:</strong> Marketing, Sales, Engineering</p>
            <p style={{margin: '0 0 8px 0'}}><strong>Perspective:</strong> Group by Business Unit</p>
            <p style={{margin: '0', color: '#4b5563'}}><em>Result: Compare spend across teams</em></p>
          </div>
        </div>
        
        {/* Use Case 3 */}
        <div style={{
          flex: '1 1 250px',
          border: '1px solid #e0e0e0',
          borderRadius: '6px',
          padding: '15px',
          backgroundColor: 'white',
          boxShadow: '0 1px 3px rgba(0,0,0,0.05)'
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            marginBottom: '10px',
            gap: '8px'
          }}>
            <div style={{
              width: '24px',
              height: '24px',
              borderRadius: '50%',
              backgroundColor: '#ea580c',
              color: 'white',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '14px',
              fontWeight: 'bold'
            }}>3</div>
            <h5 style={{margin: '0', fontSize: '15px'}}>Customer Cost Analysis</h5>
          </div>
          <div style={{fontSize: '14px'}}>
            <p style={{margin: '0 0 8px 0'}}><strong>Cost Category:</strong> Customer</p>
            <p style={{margin: '0 0 8px 0'}}><strong>Values:</strong> Client accounts</p>
            <p style={{margin: '0 0 8px 0'}}><strong>Perspective:</strong> Filter Service=EC2, Group by Customer</p>
            <p style={{margin: '0', color: '#4b5563'}}><em>Result: Identify customers driving EC2 costs</em></p>
          </div>
        </div>
      </div>
    </div>
    
    {/* Advanced Example */}
    <div style={{
      border: '1px solid #e0e0e0',
      borderRadius: '8px',
      overflow: 'hidden',
      boxShadow: '0 2px 8px rgba(0,0,0,0.05)'
    }}>
      <div style={{
        backgroundColor: '#f7f9fc',
        padding: '15px 20px',
        borderBottom: '1px solid #e0e0e0'
      }}>
        <h3 style={{margin: '0', color: '#333', fontSize: '18px'}}>Layered Insights Example</h3>
      </div>
      
      <div style={{
        padding: '20px',
        display: 'flex',
        flexDirection: 'column',
        gap: '20px'
      }}>
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '15px'
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '15px'
          }}>
            <div style={{
              backgroundColor: '#4f46e5',
              color: 'white',
              padding: '8px 12px',
              borderRadius: '4px',
              fontSize: '14px',
              fontWeight: 'bold'
            }}>Step 1</div>
            <div>
              <p style={{margin: '0', fontSize: '15px'}}><strong>Create Cost Categories to standardize inconsistent data</strong></p>
              <p style={{margin: '5px 0 0 0', fontSize: '14px', color: '#4b5563'}}>Map different tag values and accounts to consistent categories</p>
            </div>
          </div>
          
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '15px'
          }}>
            <div style={{
              backgroundColor: '#059669',
              color: 'white',
              padding: '8px 12px',
              borderRadius: '4px',
              fontSize: '14px',
              fontWeight: 'bold'
            }}>Step 2</div>
            <div>
              <p style={{margin: '0', fontSize: '15px'}}><strong>Create Perspectives with multiple dimensions</strong></p>
              <p style={{margin: '5px 0 0 0', fontSize: '14px', color: '#4b5563'}}>Monthly dashboard by Environment → Service → Region</p>
            </div>
          </div>
          
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '15px'
          }}>
            <div style={{
              backgroundColor: '#ea580c',
              color: 'white',
              padding: '8px 12px',
              borderRadius: '4px',
              fontSize: '14px',
              fontWeight: 'bold'
            }}>Result</div>
            <div>
              <p style={{margin: '0', fontSize: '15px'}}><strong>Consistent, reusable cost analysis views</strong></p>
              <p style={{margin: '5px 0 0 0', fontSize: '14px', color: '#4b5563'}}>Standardized reporting across teams with normalized dimensions</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
```
