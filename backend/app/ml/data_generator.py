import pandas as pd
import numpy as np
from datetime import datetime, timedelta
import random

def generate_cyber_logs(n_samples=1000):
    np.random.seed(42)
    
    # Base data
    timestamps = [datetime.now() - timedelta(minutes=i) for i in range(n_samples)]
    ips = [f"192.168.1.{random.randint(1, 255)}" for _ in range(n_samples)]
    
    # Features
    request_count = np.random.poisson(lam=10, size=n_samples)
    failed_logins = np.random.binomial(n=5, p=0.05, size=n_samples)
    response_time = np.random.exponential(scale=100, size=n_samples) # ms
    traffic_volume = np.random.normal(loc=500, scale=100, size=n_samples) # KB
    
    # Add anomalies
    anomaly_indices = random.sample(range(n_samples), int(n_samples * 0.05)) # 5% anomalies
    
    for idx in anomaly_indices:
        # Malicious patterns: 
        # 1. DDoS: High request count
        # 2. Brute force: High failed logins
        # 3. Exfiltration: High traffic volume
        # 4. Latency: High response time
        
        type = random.choice(['ddos', 'brute_force', 'exfiltration', 'slow_loris'])
        if type == 'ddos':
            request_count[idx] = random.randint(100, 500)
        elif type == 'brute_force':
            failed_logins[idx] = random.randint(10, 50)
        elif type == 'exfiltration':
            traffic_volume[idx] = random.randint(5000, 20000)
        elif type == 'slow_loris':
            response_time[idx] = random.randint(2000, 10000)
            
    df = pd.DataFrame({
        'timestamp': timestamps,
        'ip_address': ips,
        'request_count': request_count,
        'failed_logins': failed_logins,
        'response_time': response_time,
        'traffic_volume': traffic_volume,
        'is_anomaly': [1 if i in anomaly_indices else 0 for i in range(n_samples)]
    })
    
    # Add geo (simulated)
    countries = ['USA', 'China', 'Russia', 'Germany', 'Brazil', 'UK', 'India']
    df['location'] = [random.choice(countries) for _ in range(n_samples)]
    
    return df

if __name__ == "__main__":
    df = generate_cyber_logs(2000)
    df.to_csv('cyber_security_logs.csv', index=False)
    print("Generated cyber_security_logs.csv with 2000 samples.")
