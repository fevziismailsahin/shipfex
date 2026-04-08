use crate::errors::AppError;

/// Normalize a barcode/UPC string to GTIN-14 format.
///
/// Rules:
/// - Trim whitespace
/// - Remove all non-digit characters
/// - Reject if empty or length > 14
/// - Left-pad with zeros to exactly 14 digits
pub fn normalize_gtin14(input: &str) -> Result<String, AppError> {
    let trimmed = input.trim();
    let digits: String = trimmed.chars().filter(|c| c.is_ascii_digit()).collect();

    if digits.is_empty() {
        return Err(AppError::Validation(
            "UPC/barcode must contain at least one digit".into(),
        ));
    }

    if digits.len() > 14 {
        return Err(AppError::Validation(format!(
            "UPC/barcode too long: {} digits (max 14)",
            digits.len()
        )));
    }

    Ok(format!("{:0>14}", digits))
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_normalize_standard_upc() {
        assert_eq!(normalize_gtin14("884116305606").unwrap(), "00884116305606");
    }

    #[test]
    fn test_normalize_13_digit() {
        assert_eq!(normalize_gtin14("0884116305606").unwrap(), "00884116305606");
    }

    #[test]
    fn test_normalize_already_14() {
        assert_eq!(normalize_gtin14("00884116305606").unwrap(), "00884116305606");
    }

    #[test]
    fn test_normalize_with_spaces() {
        assert_eq!(normalize_gtin14("  884116305606  ").unwrap(), "00884116305606");
    }

    #[test]
    fn test_normalize_with_dashes() {
        assert_eq!(normalize_gtin14("884-116-305606").unwrap(), "00884116305606");
    }

    #[test]
    fn test_normalize_too_long() {
        assert!(normalize_gtin14("123456789012345").is_err());
    }

    #[test]
    fn test_normalize_empty() {
        assert!(normalize_gtin14("").is_err());
        assert!(normalize_gtin14("abc").is_err());
    }
}
