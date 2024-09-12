import unittest
from date_sum import sum_date_parts

class TestDateSum(unittest.TestCase):
    
    def test_sum_date_parts(self):
        # Test with a known date
        self.assertEqual(sum_date_parts("2023-08-22"), 2053)
        self.assertEqual(sum_date_parts("2000-01-01"), 2002)
        self.assertEqual(sum_date_parts("2020-12-31"), 2063)

if __name__ == "__main__":
    unittest.main()
